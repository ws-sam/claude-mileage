import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { spawnSync } from 'child_process';
import { 
  updateFileMetadata, 
  getContextData, 
  getFileContent, 
} from '../dist/lib/workspace.js';

const MILEAGE_DIR = '.mileage';

// Setup
if (!fs.existsSync(MILEAGE_DIR)) fs.mkdirSync(MILEAGE_DIR);

function cleanup() {
  if (fs.existsSync(path.join(MILEAGE_DIR, 'context.json'))) fs.unlinkSync(path.join(MILEAGE_DIR, 'context.json'));
  if (fs.existsSync(path.join(MILEAGE_DIR, 'config.json'))) fs.unlinkSync(path.join(MILEAGE_DIR, 'config.json'));
  if (fs.existsSync('test-file.txt')) fs.unlinkSync('test-file.txt');
}

async function runTests() {
  console.log('Running Reliability Tests...');

  try {
    // 1. Test pinned flag update
    console.log('Testing: Pinned flag update...');
    cleanup();
    fs.writeFileSync('test-file.txt', 'hello');
    
    updateFileMetadata('test-file.txt', true);
    let data = getContextData();
    assert.strictEqual(data.files[0].pinned, true, 'Should be pinned initially');
    
    updateFileMetadata('test-file.txt', false);
    data = getContextData();
    assert.strictEqual(data.files[0].pinned, false, 'Should be unpinned after update');
    console.log('✔ Pinned flag update passed');

    // 2. Test multibyte-safe truncation
    console.log('Testing: Multibyte-safe truncation...');
    cleanup();
    const emoji = '🚀'; 
    fs.writeFileSync('test-file.txt', emoji + 'more');
    fs.writeFileSync(path.join(MILEAGE_DIR, 'config.json'), JSON.stringify({ max_file_size_kb: 3/1024 })); 
    
    const content = getFileContent('test-file.txt');
    assert.ok(!content.includes('🚀'), 'Should not contain the split emoji');
    assert.ok(!content.includes('\uFFFD'), 'Should not contain replacement characters');
    assert.ok(content.includes('[TRUNCATED'), 'Should include truncation message');
    console.log('✔ Multibyte-safe truncation passed');

    // 3. Test malformed JSON handling (Child Process)
    console.log('Testing: Malformed JSON handling...');
    cleanup();
    fs.writeFileSync(path.join(MILEAGE_DIR, 'context.json'), '{ malformed: json ');
    
    const result = spawnSync('node', [
        '-e', 
        'import { getContextData } from "./dist/lib/workspace.js"; getContextData();'
    ], { encoding: 'utf8' });

    assert.strictEqual(result.status, 1, 'Should exit with code 1');
    // Note: Checking for the core message, ignoring ANSI colors
    assert.ok(result.stderr.includes('Failed to parse local state'), `Should print clear error message to stderr. Got: ${result.stderr}`);
    console.log('✔ Malformed JSON handling passed');

    console.log('\nAll reliability tests passed successfully.');
  } catch (error) {
    console.error('Test Failed!');
    console.error(error);
    process.exit(1);
  } finally {
    cleanup();
  }
}

runTests();
