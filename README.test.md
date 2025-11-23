# Tests Guide

## Running Tests

### Run all tests
```bash
npm run test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with UI
```bash
npm run test:ui
```

### Generate coverage report
```bash
npm run test:coverage
```

## Test Structure

### Validation Tests (`src/lib/__tests__/validation.test.ts`)
Tests for input validation functions:
- GitHub URL validation
- Repository name validation
- String sanitization
- Manifest structure validation

### Hook Tests (`src/hooks/__tests__/useRepositories.test.tsx`)
Tests for custom React hooks:
- Repository fetching
- Repository CRUD operations
- Loading states
- Error handling

## Writing New Tests

### Basic Test Structure
```typescript
import { describe, it, expect } from 'vitest';

describe('Feature Name', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```

### Testing React Hooks
```typescript
import { renderHook } from '@testing-library/react';
import { useYourHook } from '../useYourHook';

describe('useYourHook', () => {
  it('should return expected value', () => {
    const { result } = renderHook(() => useYourHook());
    expect(result.current.value).toBe(expected);
  });
});
```

## Best Practices

1. **Isolate Tests**: Each test should be independent
2. **Mock External Dependencies**: Use `vi.mock()` for API calls and external services
3. **Test Edge Cases**: Include tests for error conditions and boundary values
4. **Clear Descriptions**: Use descriptive test names that explain what is being tested
5. **Arrange-Act-Assert**: Structure tests with clear setup, execution, and verification phases

## Code Coverage

Target coverage:
- Functions: > 80%
- Branches: > 75%
- Lines: > 80%

View coverage report after running:
```bash
npm run test:coverage
open coverage/index.html
```
