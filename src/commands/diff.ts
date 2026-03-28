import chalk from 'chalk';
import { executeClaude } from '../lib/claude.js';
import { buildPromptPayload } from '../lib/prompt.js';
import { getGitDiff } from '../lib/git.js';
import { 
  readBrief, 
  readRecentHistory, 
  getContextData, 
  getFileContent, 
  appendHistory,
  updateFileMetadata
} from '../lib/workspace.js';

export async function diffCommand(request: string) {
  const brief = readBrief();
  const history = readRecentHistory();
  const { files: tracked } = getContextData();
  const pinned = tracked.filter(f => f.pinned);
  const diff = getGitDiff();

  const files = pinned.map(f => ({
    path: f.path,
    content: getFileContent(f.path)
  }));

  const payload = buildPromptPayload({ brief, history, files, diff, userRequest: request });
  const response = executeClaude(payload.prompt);
  
  process.stdout.write('\n' + response + '\n');
  
  // Successful run side-effects
  appendHistory('diff', request.slice(0, 40), 'Success');
  pinned.forEach(f => updateFileMetadata(f.path));
}
