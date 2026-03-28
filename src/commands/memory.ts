import chalk from 'chalk';
import { readBrief, readRecentHistory, getContextData } from '../lib/workspace.js';

export function memoryCommand() {
  console.log(chalk.bold('\n--- Project Brief ---'));
  console.log(readBrief() || chalk.dim('[Empty]'));

  console.log(chalk.bold('\n--- Recent History ---'));
  const history = readRecentHistory(5);
  if (history.length === 0) {
    console.log(chalk.dim('[No history recorded]'));
  } else {
    history.forEach(line => console.log(line));
  }

  console.log(chalk.bold('\n--- Tracked Files ---'));
  const data = getContextData();
  if (data.files.length === 0) {
    console.log(chalk.dim('[No files tracked]'));
  } else {
    data.files.forEach(f => {
      const status = f.pinned ? chalk.green('pinned') : chalk.dim('tracked');
      console.log(`${status.padEnd(15)} ${f.path} ${chalk.dim(`(${f.lastHash || 'no-hash'})`)}`);
    });
  }
}
