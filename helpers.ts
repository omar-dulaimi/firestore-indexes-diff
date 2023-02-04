import chalk from 'chalk';
import { promises as fs } from 'fs';
import ora from 'ora';
import path from 'path';
import { ProgramArgs } from './types.js';

export async function getParsedFiles(options: ProgramArgs) {
  const sourceFilePath = path.join(process.cwd(), options.source);
  const targetFilePath = path.join(process.cwd(), options.target);

  const sourceFile = JSON.parse(await fs.readFile(sourceFilePath, 'utf-8'));
  const targetFile = JSON.parse(await fs.readFile(targetFilePath, 'utf-8'));

  return [sourceFile, targetFile];
}

export const diffIndexes = async (sourceFile: any, targetFile: any) => {
  const spinner = ora('  Source Indexes');
  spinner.color = 'yellow';
  spinner.prefixText = chalk.yellow('process');
  spinner.start();

  const missingIndexes: any[] = [];
  for (const sourceIndex of sourceFile.indexes) {
    let isMissing = true;
    for (const targetIndex of targetFile.indexes) {
      if (
        sourceIndex.collectionGroup === targetIndex.collectionGroup &&
        sourceIndex.queryScope === targetIndex.queryScope &&
        JSON.stringify(sourceIndex.fields) ===
          JSON.stringify(targetIndex.fields)
      ) {
        isMissing = false;
        break;
      }
    }
    if (isMissing) {
      missingIndexes.push(sourceIndex);
    }
  }

  spinner.stopAndPersist();
  return missingIndexes;
};

export const diffFieldOverrides = async (targetFile: any) => {
  const spinner = ora('  Target Indexes');
  spinner.color = 'yellow';
  spinner.prefixText = chalk.yellow('process');
  spinner.start();

  const missingFieldOverrides: any = [];
  for (const sourceFieldOverride of targetFile?.fieldOverrides ?? []) {
    let isMissing = true;
    for (const targetFieldOverride of targetFile.fieldOverrides) {
      if (
        sourceFieldOverride.collectionGroup ===
          targetFieldOverride.collectionGroup &&
        sourceFieldOverride.fieldPath === targetFieldOverride.fieldPath
      ) {
        for (const sourceIndex of sourceFieldOverride.indexes) {
          let isIndexMissing = true;
          for (const targetIndex of targetFieldOverride.indexes) {
            if (
              sourceIndex.queryScope === targetIndex.queryScope &&
              (sourceIndex.arrayConfig === targetIndex.arrayConfig ||
                sourceIndex.order === targetIndex.order)
            ) {
              isIndexMissing = false;
              break;
            }
          }
          if (isIndexMissing) {
            isMissing = false;
            break;
          }
        }
        if (!isMissing) {
          break;
        }
      }
    }
    if (isMissing) {
      missingFieldOverrides.push(sourceFieldOverride);
    }
  }

  spinner.stopAndPersist();
  return missingFieldOverrides;
};

export const printDiffs = (
  missingIndexes: any[],
  missingFieldOverrides: any[],
) => {
  let spinner = ora('   Missing Indexes');
  spinner.color = 'green';
  spinner.prefixText = chalk.cyan('output');

  if (missingIndexes.length > 0) {
    spinner.start();

    missingIndexes.forEach((missingIndex) => {
      console.log('\n\n\r', chalk.red(JSON.stringify(missingIndex, null, 2)));
    });
    spinner.stop();
  }

  if (missingFieldOverrides.length > 0) {
    spinner = ora('     Missing Field Overrides');
    spinner.color = 'green';
    spinner.prefixText = chalk.cyan('output');

    spinner.start();

    missingFieldOverrides.forEach((missingFieldOverride) => {
      console.log(
        '\n\n\r',
        chalk.red(JSON.stringify(missingFieldOverride, null, 2)),
      );
    });
    spinner.stopAndPersist();
  }
};
