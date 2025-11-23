/**
 * Validation utilities for URLs and data
 */

/**
 * Validates a GitHub raw content URL
 */
export const validateGitHubRawUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return (
      urlObj.protocol === 'https:' &&
      urlObj.hostname === 'raw.githubusercontent.com'
    );
  } catch {
    return false;
  }
};

/**
 * Validates a repository name
 */
export const validateRepositoryName = (name: string): boolean => {
  return name.trim().length >= 3 && name.trim().length <= 100;
};

/**
 * Sanitizes a string for database storage
 */
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Validates manifest JSON structure
 */
export const validateManifest = (data: any): boolean => {
  // Check if it's an array of apps or a single app or an object with apps array
  if (Array.isArray(data)) {
    return data.every(app => app.id && app.name);
  }
  
  if (data.apps && Array.isArray(data.apps)) {
    return data.apps.every((app: any) => app.id && app.name);
  }
  
  return !!(data.id && data.name);
};
