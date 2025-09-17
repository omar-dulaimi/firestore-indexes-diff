import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import { diffIndexes, diffFieldOverrides, getParsedFiles } from '../helpers.js';

describe('Firestore Indexes Diff', () => {
  const testDir = path.join(process.cwd(), 'test-temp');

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true });
  });

  describe('getParsedFiles', () => {
    it('should parse JSON files correctly', async () => {
      const sourceData = { indexes: [{ name: 'test-index' }] };
      const targetData = { indexes: [{ name: 'prod-index' }] };

      const sourcePath = path.join(testDir, 'source.json');
      const targetPath = path.join(testDir, 'target.json');

      await fs.writeFile(sourcePath, JSON.stringify(sourceData));
      await fs.writeFile(targetPath, JSON.stringify(targetData));

      const [source, target] = await getParsedFiles({
        source: path.relative(process.cwd(), sourcePath),
        target: path.relative(process.cwd(), targetPath),
      });

      expect(source).toEqual(sourceData);
      expect(target).toEqual(targetData);
    });
  });

  describe('diffIndexes', () => {
    it('should find missing indexes', async () => {
      const sourceFile = {
        indexes: [
          {
            collectionGroup: 'users',
            queryScope: 'COLLECTION',
            fields: [{ fieldPath: 'name', order: 'ASCENDING' }],
          },
          {
            collectionGroup: 'posts',
            queryScope: 'COLLECTION',
            fields: [{ fieldPath: 'title', order: 'ASCENDING' }],
          },
        ],
      };

      const targetFile = {
        indexes: [
          {
            collectionGroup: 'users',
            queryScope: 'COLLECTION',
            fields: [{ fieldPath: 'name', order: 'ASCENDING' }],
          },
        ],
      };

      const missingIndexes = await diffIndexes(sourceFile, targetFile);

      expect(missingIndexes).toHaveLength(1);
      expect(missingIndexes[0].collectionGroup).toBe('posts');
    });

    it('should return empty array when no indexes are missing', async () => {
      const sourceFile = {
        indexes: [
          {
            collectionGroup: 'users',
            queryScope: 'COLLECTION',
            fields: [{ fieldPath: 'name', order: 'ASCENDING' }],
          },
        ],
      };

      const targetFile = {
        indexes: [
          {
            collectionGroup: 'users',
            queryScope: 'COLLECTION',
            fields: [{ fieldPath: 'name', order: 'ASCENDING' }],
          },
        ],
      };

      const missingIndexes = await diffIndexes(sourceFile, targetFile);

      expect(missingIndexes).toHaveLength(0);
    });
  });

  describe('diffFieldOverrides', () => {
    it('should handle missing fieldOverrides property', async () => {
      const targetFile = {};

      const missingFieldOverrides = await diffFieldOverrides(targetFile);

      expect(missingFieldOverrides).toEqual([]);
    });

    it('should find missing field overrides', async () => {
      const targetFile = {
        fieldOverrides: [
          {
            collectionGroup: 'users',
            fieldPath: 'tags',
            indexes: [
              {
                queryScope: 'COLLECTION',
                arrayConfig: 'CONTAINS',
              },
            ],
          },
        ],
      };

      const missingFieldOverrides = await diffFieldOverrides(targetFile);

      expect(missingFieldOverrides).toHaveLength(1);
      expect(missingFieldOverrides[0].collectionGroup).toBe('users');
    });
  });
});
