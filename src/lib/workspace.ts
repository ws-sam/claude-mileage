import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const MILEAGE_DIR = '.mileage';

export interface ContextFile {
  path: string;
  pinned: boolean;
  lastHash?: string;
  lastIncludedAt?: string;
}

export interface MileageConfig {
  max_file_size_kb: number;
  preferred_diff: 'staged' | 'head';
}

function parseLocalJson<T>(filePath: string, defaultVal: T): T {
  if (!fs.existsSync(filePath)) return defaultVal;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error: any) {
    // Fail clearly and deterministically on malformed JSON
    console.error(`\x1b[31m[Error]\x1b[0m Failed to parse local state: ${filePath}`);
    console.error(`Details: ${error.message}`);
    process.exit(1);
  }
}

export function readConfig(): MileageConfig {
  const p = path.join(MILEAGE_DIR, 'config.json');
  return parseLocalJson<MileageConfig>(p, { max_file_size_kb: 50, preferred_diff: 'staged' });
}

export function readBrief(): string {
  const p = path.join(MILEAGE_DIR, 'brief.md');
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

export function readRecentHistory(limit = 5): string[] {
  const p = path.join(MILEAGE_DIR, 'history.log');
  if (!fs.existsSync(p)) return [];
  return fs.readFileSync(p, 'utf8').trim().split('\n').slice(-limit);
}

export function appendHistory(command: string, label: string, status = 'Success') {
  const p = path.join(MILEAGE_DIR, 'history.log');
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const entry = `[${timestamp}] ${command.toUpperCase()}: ${label} | ${status}\n`;
  fs.appendFileSync(p, entry);
}

export function getContextData(): { files: ContextFile[] } {
  const p = path.join(MILEAGE_DIR, 'context.json');
  return parseLocalJson<{ files: ContextFile[] }>(p, { files: [] });
}

export function saveContextData(data: { files: ContextFile[] }) {
  fs.writeFileSync(path.join(MILEAGE_DIR, 'context.json'), JSON.stringify(data, null, 2));
}

export function getFileContent(filePath: string): string {
  if (!fs.existsSync(filePath)) return '[File not found]';
  const config = readConfig();
  const limitBytes = Math.floor(config.max_file_size_kb * 1024);
  const buffer = fs.readFileSync(filePath);
  
  if (buffer.length > limitBytes) {
    // Multibyte-safe truncation: 
    // 1. Slice at byte boundary
    // 2. Convert to string (Node handles partial sequences by inserting )
    // 3. Trim the trailing  if we cut through a character
    let content = buffer.subarray(0, limitBytes).toString('utf8');
    if (content.endsWith('\uFFFD') && !buffer.subarray(0, limitBytes).toString('utf8').endsWith('\uFFFD')) {
        // This check is subtle: we only trim if the truncation introduced the replacement char
    }
    // Simpler approach for the task constraint:
    if (content.endsWith('\uFFFD')) {
        content = content.slice(0, -1);
    }
    
    return content + `\n\n[TRUNCATED: File exceeds ${config.max_file_size_kb}KB]`;
  }
  return buffer.toString('utf8');
}

export function updateFileMetadata(filePath: string, pinned = true) {
  const data = getContextData();
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  const hash = crypto.createHash('sha256').update(content).digest('hex').slice(0, 8);
  
  const idx = data.files.findIndex(f => f.path === filePath);
  if (idx > -1) {
    // Respect the incoming pinned status for existing entries
    data.files[idx] = { ...data.files[idx], pinned, lastHash: hash, lastIncludedAt: new Date().toISOString() };
  } else {
    data.files.push({ path: filePath, pinned, lastHash: hash, lastIncludedAt: new Date().toISOString() });
  }
  saveContextData(data);
}
