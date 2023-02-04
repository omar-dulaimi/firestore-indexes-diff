#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import { Command } from 'commander';
import figlet from 'figlet';
import process from 'process';
import main from '../main.js';
import packageJson from '../package.json' assert { type: 'json' };
import { ProgramArgs } from '../types.js';

clear();
console.log(
  chalk.blue(
    figlet.textSync('diff-indexes', {
      horizontalLayout: 'full',
      width: 120,
    }),
  ),
);

const program = new Command();

program
  .version(packageJson.version, '-v, --version')
  .description('Displays differences between two Firestore index config files')
  .requiredOption(
    '-s, --source <value>',
    'Source indexes file path with extension',
  )
  .requiredOption(
    '-t, --target <value>',
    'Target indexes file path with extension',
  )
  .parse(process.argv);

const options: ProgramArgs = program.opts();

main(options).catch((error) => {
  console.log('\n\n\r', chalk.red('Failed') + error + '\n\n');
});
