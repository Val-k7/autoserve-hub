import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useRepositories } from '../useRepositories';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          order: vi.fn(() => ({
            data: [],
            error: null,
          })),
        })),
      })),
      insert: vi.fn(() => ({ error: null })),
      delete: vi.fn(() => ({ eq: vi.fn(() => ({ error: null })) })),
    })),
    auth: {
      getUser: vi.fn(() => Promise.resolve({ data: { user: { id: 'test-user' } }, error: null })),
    },
    functions: {
      invoke: vi.fn(() => Promise.resolve({ data: { success: true }, error: null })),
    },
  },
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('useRepositories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useRepositories());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.repositories).toEqual([]);
    expect(result.current.syncing).toBeNull();
  });

  it('should fetch repositories on mount', async () => {
    const { result } = renderHook(() => useRepositories());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.repositories).toBeDefined();
  });

  it('should provide all necessary functions', () => {
    const { result } = renderHook(() => useRepositories());
    
    expect(typeof result.current.addRepository).toBe('function');
    expect(typeof result.current.syncRepository).toBe('function');
    expect(typeof result.current.deleteRepository).toBe('function');
    expect(typeof result.current.fetchRepositories).toBe('function');
  });

  it('should handle repository operations', async () => {
    const { result } = renderHook(() => useRepositories());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Test that functions can be called without errors
    expect(() => {
      result.current.addRepository('Test Repo', 'Description', 'https://raw.githubusercontent.com/test/test/main/manifest.json');
    }).not.toThrow();
  });
});
