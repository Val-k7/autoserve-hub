import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRepositories } from '../useRepositories';

// Mock Supabase client with proper promise chains
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn((table: string) => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({
            data: [],
            error: null,
          })),
        })),
        eq: vi.fn(() => ({
          maybeSingle: vi.fn(() => Promise.resolve({ data: null, error: null })),
        })),
      })),
      insert: vi.fn(() => Promise.resolve({ error: null })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null })),
      })),
    })),
    auth: {
      getUser: vi.fn(() => Promise.resolve({ 
        data: { user: { id: 'test-user-123' } }, 
        error: null 
      })),
    },
    functions: {
      invoke: vi.fn(() => Promise.resolve({ 
        data: { success: true, message: 'Test sync completed' }, 
        error: null 
      })),
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
    
    // Initial state check
    expect(result.current.loading).toBe(true);
    
    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 200));
    
    expect(result.current.loading).toBe(false);
    expect(result.current.repositories).toBeDefined();
    expect(Array.isArray(result.current.repositories)).toBe(true);
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
    
    // Wait for loading to complete
    await new Promise(resolve => setTimeout(resolve, 200));

    // Test addRepository
    const addResult = await result.current.addRepository(
      'Test Repo', 
      'Test Description', 
      'https://raw.githubusercontent.com/test/test/main/manifest.json'
    );
    expect(addResult).toBeDefined();
    expect(addResult.success).toBe(true);
  });

  it('should handle sync operation', async () => {
    const { result } = renderHook(() => useRepositories());
    
    await new Promise(resolve => setTimeout(resolve, 200));

    // Test syncRepository
    const syncResult = await result.current.syncRepository('test-repo-id');
    expect(syncResult).toBeDefined();
    expect(syncResult.success).toBe(true);
  });

  it('should handle delete operation', async () => {
    const { result } = renderHook(() => useRepositories());
    
    await new Promise(resolve => setTimeout(resolve, 200));

    // Test deleteRepository
    const deleteResult = await result.current.deleteRepository('test-repo-id');
    expect(deleteResult).toBeDefined();
    expect(deleteResult.success).toBe(true);
  });
});
