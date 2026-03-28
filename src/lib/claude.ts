import { spawnSync } from 'child_process';
import chalk from 'chalk';

export function getClaudeBinary(): string {
  const isWindows = process.platform === 'win32';
  const binary = isWindows ? 'claude.cmd' : 'claude';
  
  // Soft diagnostic check
  const check = spawnSync(binary, ['--version'], { shell: isWindows });
  if (check.error || (check.status !== 0 && check.status !== null)) {
    throw new Error(`Claude CLI binary not found. Please ensure '${binary}' is in your PATH.`);
  }
  return binary;
}

export function executeClaude(prompt: string): string {
  const binary = getClaudeBinary();
  console.log(chalk.dim(`\n--- Calling ${binary} -p ---`));
  
  const result = spawnSync(binary, ['-p', prompt], { 
    encoding: 'utf8',
    shell: process.platform === 'win32',
    maxBuffer: 1024 * 1024 * 10 // 10MB limit
  });

  if (result.status !== 0) {
    console.error(chalk.red('\nClaude execution failed:'), result.stderr);
    process.exit(1);
  }

  return result.stdout;
}
