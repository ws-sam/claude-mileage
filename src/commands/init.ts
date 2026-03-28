import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export function initCommand() {
  const dir = '.mileage';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    const defaults = {
      'brief.md': '# Project Brief\nUpdate this with your project overview.',
      'history.log': '',
      'context.json': JSON.stringify({ files: [] }, null, 2),
      'config.json': JSON.stringify({ max_file_size_kb: 50, preferred_diff: 'staged' }, null, 2)
    };

    for (const [file, content] of Object.entries(defaults)) {
      fs.writeFileSync(path.join(dir, file), content);
    }
    console.log(chalk.green('✔ Initialized .mileage workspace'));
  } else {
    console.log(chalk.yellow('! .mileage workspace already exists'));
  }
}
