import { describe, it, expect } from 'vitest';
import {
  validateGitHubRawUrl,
  validateRepositoryName,
  sanitizeString,
  validateManifest,
} from '../validation';

describe('validation utilities', () => {
  describe('validateGitHubRawUrl', () => {
    it('should accept valid GitHub raw URLs', () => {
      const validUrls = [
        'https://raw.githubusercontent.com/user/repo/main/manifest.json',
        'https://raw.githubusercontent.com/org/project/master/apps.json',
        'https://raw.githubusercontent.com/test/test/develop/data.json',
      ];

      validUrls.forEach(url => {
        expect(validateGitHubRawUrl(url)).toBe(true);
      });
    });

    it('should reject invalid URLs', () => {
      const invalidUrls = [
        'http://raw.githubusercontent.com/user/repo/main/manifest.json', // http
        'https://github.com/user/repo/blob/main/manifest.json', // not raw
        'https://example.com/manifest.json', // wrong domain
        'not-a-url',
        '',
        'ftp://raw.githubusercontent.com/test.json',
      ];

      invalidUrls.forEach(url => {
        expect(validateGitHubRawUrl(url)).toBe(false);
      });
    });

    it('should handle malformed URLs gracefully', () => {
      expect(validateGitHubRawUrl('://invalid')).toBe(false);
      expect(validateGitHubRawUrl('https://')).toBe(false);
    });
  });

  describe('validateRepositoryName', () => {
    it('should accept valid repository names', () => {
      const validNames = [
        'My Repo',
        'Test Repository 123',
        'A'.repeat(100), // exactly 100 chars
        'Valid Name',
      ];

      validNames.forEach(name => {
        expect(validateRepositoryName(name)).toBe(true);
      });
    });

    it('should reject invalid repository names', () => {
      const invalidNames = [
        'ab', // too short
        'A'.repeat(101), // too long
        '  ', // only spaces
        '',
      ];

      invalidNames.forEach(name => {
        expect(validateRepositoryName(name)).toBe(false);
      });
    });

    it('should trim spaces when validating length', () => {
      expect(validateRepositoryName('  Valid  ')).toBe(true);
      expect(validateRepositoryName('  ab  ')).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeString('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
      expect(sanitizeString('Hello <b>World</b>')).toBe('Hello bWorld/b');
      expect(sanitizeString('Test < > brackets')).toBe('Test  brackets');
    });

    it('should trim whitespace', () => {
      expect(sanitizeString('  hello  ')).toBe('hello');
      expect(sanitizeString('\n\ttext\n')).toBe('text');
    });

    it('should handle empty strings', () => {
      expect(sanitizeString('')).toBe('');
      expect(sanitizeString('   ')).toBe('');
    });

    it('should preserve safe characters', () => {
      const safeText = 'Hello World 123 !@#$%^&*()';
      expect(sanitizeString(safeText)).toBe(safeText);
    });
  });

  describe('validateManifest', () => {
    it('should validate array of apps', () => {
      const validManifest = [
        { id: 'app1', name: 'App One', description: 'Test' },
        { id: 'app2', name: 'App Two' },
      ];
      expect(validateManifest(validManifest)).toBe(true);
    });

    it('should validate object with apps array', () => {
      const validManifest = {
        version: '1.0',
        apps: [
          { id: 'app1', name: 'App One' },
          { id: 'app2', name: 'App Two' },
        ],
      };
      expect(validateManifest(validManifest)).toBe(true);
    });

    it('should validate single app object', () => {
      const validManifest = {
        id: 'single-app',
        name: 'Single App',
        version: '1.0',
      };
      expect(validateManifest(validManifest)).toBe(true);
    });

    it('should reject invalid manifests', () => {
      const invalidManifests = [
        [{ name: 'No ID' }], // missing id
        [{ id: 'test' }], // missing name
        { apps: [{ name: 'No ID' }] }, // apps array with missing id
        { name: 'No ID' }, // single app without id
        { id: 'test' }, // single app without name
        null,
        undefined,
        {},
        [],
      ];

      invalidManifests.forEach(manifest => {
        expect(validateManifest(manifest)).toBe(false);
      });
    });

    it('should handle mixed valid/invalid apps in array', () => {
      const manifest = [
        { id: 'app1', name: 'Valid' },
        { name: 'Invalid - no id' },
      ];
      expect(validateManifest(manifest)).toBe(false);
    });
  });
});
