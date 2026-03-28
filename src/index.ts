#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { askCommand } from './commands/ask.js';
import { diffCommand } from './commands/diff.js';
import { contextCommand } from './commands/context.js';
import { memoryCommand } from './commands/memory.js';

const program = new Command();

program
  .name('claude-mileage')
  .description('Local-first preparation layer for Claude CLI')
  .version('0.1.0');

program.command('init').description('Initialize the .mileage workspace').action(initCommand);
program.command('ask <request>').description('Send a grounded one-shot request').action(askCommand);
program.command('diff <request>').description('Send a request prioritized by git diff').action(diffCommand);

program.command('context')
  .argument('[action]', 'pin | unpin')
  .argument('[path]', 'file path')
  .description('Manage pinned files or preview prompt payload')
  .action(contextCommand);

program.command('memory').description('Inspect local project state and request logs').action(memoryCommand);

program.parse();
