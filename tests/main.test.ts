import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import main from '../main.js';

// Mock the helpers module
vi.mock('../helpers.js', () => ({
  getParsedFiles: vi.fn(),
  diffIndexes: vi.fn(),
  diffFieldOverrides: vi.fn(),
  writeDiffs: vi.fn(),
}));

describe('main function', () => {
  const testDir = path.join(process.cwd(), 'test-temp-main');

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true });
    vi.clearAllMocks();
  });

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true });
  });

  it('should orchestrate the diff process correctly', async () => {
    const { getParsedFiles, diffIndexes, diffFieldOverrides, writeDiffs } =
      await import('../helpers.js');

    const mockSourceFile = { indexes: [] as any[] };
    const mockTargetFile = { indexes: [] as any[] };
    const mockMissingIndexes = [{ name: 'missing-index' }];
    const mockMissingFieldOverrides = [{ name: 'missing-override' }];

    (getParsedFiles as any).mockResolvedValue([mockSourceFile, mockTargetFile]);
    (diffIndexes as any).mockResolvedValue(mockMissingIndexes);
    (diffFieldOverrides as any).mockResolvedValue(mockMissingFieldOverrides);
    (writeDiffs as any).mockResolvedValue(undefined);

    const options = {
      source: 'dev.json',
      target: 'prod.json',
    };

    await main(options);

    expect(getParsedFiles).toHaveBeenCalledWith(options);
    expect(diffIndexes).toHaveBeenCalledWith(mockSourceFile, mockTargetFile);
    expect(diffFieldOverrides).toHaveBeenCalledWith(mockTargetFile);
    expect(writeDiffs).toHaveBeenCalledWith(
      mockMissingIndexes,
      mockMissingFieldOverrides,
    );
  });
});
