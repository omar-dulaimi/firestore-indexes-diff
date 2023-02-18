import {
  diffFieldOverrides,
  diffIndexes,
  getParsedFiles,
  writeDiffs
} from './helpers.js';
import { ProgramArgs } from './types.js';

export default async function main(options: ProgramArgs) {
  const [sourceFile, targetFile] = await getParsedFiles(options);

  const missingIndexes = await diffIndexes(sourceFile, targetFile);
  const missingFieldOverrides = await diffFieldOverrides(targetFile);

  writeDiffs(missingIndexes, missingFieldOverrides);
}
