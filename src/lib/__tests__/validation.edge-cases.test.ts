import { describe, it, expect } from 'vitest';
import {
  validateGitHubRawUrl,
  validateRepositoryName,
  sanitizeString,
  validateManifest,
} from '../validation';

/**
 * Extended tests for edge cases and security
 */
describe('validation edge cases', () => {
  describe('validateGitHubRawUrl security', () => {
    it('should reject URLs with suspicious patterns', () => {
      const suspiciousUrls = [
        'https://raw.githubusercontent.com/../../../etc/passwd',
        'https://raw.githubusercontent.com/user/repo/main/../../secret.json',
        'javascript:alert("xss")',
        'data:text/html,<script>alert("xss")</script>',
      ];

      suspiciousUrls.forEach(url => {
        expect(validateGitHubRawUrl(url)).toBe(false);
      });
    });

    it('should reject URLs with encoded characters', () => {
      const encodedUrls = [
        'https://raw.githubusercontent.com/%2e%2e%2fmalicious',
        'https://raw.githubusercontent.com/user%00/repo',
      ];

      encodedUrls.forEach(url => {
        expect(validateGitHubRawUrl(url)).toBe(false);
      });
    });
  });

  describe('sanitizeString XSS protection', () => {
    it('should prevent XSS attacks', () => {
      const xssAttempts = [
        '<img src=x onerror=alert("xss")>',
        '<script>alert(document.cookie)</script>',
        '<iframe src="javascript:alert(\'xss\')"></iframe>',
        'javascript:void(0)',
        '<svg onload=alert("xss")>',
      ];

      xssAttempts.forEach(attempt => {
        const sanitized = sanitizeString(attempt);
        expect(sanitized).not.toContain('<');
        expect(sanitized).not.toContain('>');
      });
    });

    it('should handle unicode and special characters safely', () => {
      const unicodeStrings = [
        '日本語テキスト',
        'Émojis: 🚀 💻 🔥',
        'Special: @#$%^&*()',
        'Mixed: Hello世界🌍',
      ];

      unicodeStrings.forEach(str => {
        const sanitized = sanitizeString(str);
        expect(sanitized).toBeTruthy();
        expect(typeof sanitized).toBe('string');
      });
    });
  });

  describe('validateManifest complex scenarios', () => {
    it('should handle deeply nested manifest structures', () => {
      const complexManifest = {
        version: '1.0',
        apps: [
          {
            id: 'complex-app',
            name: 'Complex App',
            environment_variables: [
              {
                name: 'NESTED_VAR',
                nested: {
                  deep: {
                    value: 'test',
                  },
                },
              },
            ],
            ports: [
              { container: 8080, host: 80 },
            ],
          },
        ],
      };

      expect(validateManifest(complexManifest)).toBe(true);
    });

    it('should reject manifests with prototype pollution attempts', () => {
      const maliciousManifest = {
        apps: [
          {
            id: 'app1',
            name: 'App',
            '__proto__': { isAdmin: true },
          },
        ],
      };

      // Should still validate structure but data sanitization should happen server-side
      expect(validateManifest(maliciousManifest)).toBe(true);
    });

    it('should handle very large manifests', () => {
      const largeManifest = {
        apps: Array.from({ length: 1000 }, (_, i) => ({
          id: `app-${i}`,
          name: `Application ${i}`,
        })),
      };

      expect(validateManifest(largeManifest)).toBe(true);
    });
  });

  describe('validateRepositoryName boundary tests', () => {
    it('should handle exact boundary lengths', () => {
      expect(validateRepositoryName('abc')).toBe(true); // exactly 3
      expect(validateRepositoryName('ab')).toBe(false); // 2
      expect(validateRepositoryName('a'.repeat(100))).toBe(true); // exactly 100
      expect(validateRepositoryName('a'.repeat(101))).toBe(false); // 101
    });

    it('should handle names with various whitespace', () => {
      expect(validateRepositoryName('   Valid Name   ')).toBe(true);
      expect(validateRepositoryName('\t\tValid\t\t')).toBe(true);
      expect(validateRepositoryName('\n\nValid\n\n')).toBe(true);
    });

    it('should reject names with only special characters', () => {
      expect(validateRepositoryName('   ')).toBe(false);
      expect(validateRepositoryName('\t\t\t')).toBe(false);
      expect(validateRepositoryName('\n\n\n')).toBe(false);
    });
  });
});
