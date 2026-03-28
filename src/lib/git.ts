import { spawnSync } from 'child_process';
import { readConfig } from './workspace.js';

export function getGitDiff(): string {
  const config = readConfig();
  const args = config.preferred_diff === 'staged' ? ['diff', '--staged'] : ['diff', 'HEAD'];
  
  let result = spawnSync('git', args, { encoding: 'utf8' });
  
  // Fallback if staged is empty but preferred
  if (config.preferred_diff === 'staged' && !result.stdout.trim()) {
    result = spawnSync('git', ['diff', 'HEAD'], { encoding: 'utf8' });
  }
  
  return result.status === 0 ? result.stdout : '';
}
