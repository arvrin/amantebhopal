# Testing Guide - Amante Restaurant Website

## Table of Contents
- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Overview

This project uses a comprehensive testing approach with three levels:
- **Unit Tests**: Test individual components, functions, and API routes in isolation
- **Integration Tests**: Test how different parts work together
- **End-to-End Tests**: Test complete user workflows in a real browser

**Coverage Goal**: 80%+ across the codebase

## Testing Stack

### Core Testing Tools
- **Vitest**: Fast unit test runner with native ESM support
- **Testing Library**: React component testing utilities
- **Playwright**: End-to-end testing framework
- **MSW**: API mocking for tests

### Supporting Libraries
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **@testing-library/user-event**: User interaction simulation
- **@vitest/coverage-v8**: Code coverage reporting

## Running Tests

### Unit & Integration Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- __tests__/unit/api/reservations.test.ts

# Run tests matching a pattern
npm test -- --grep "Button"
```

### End-to-End Tests

```bash
# Run E2E tests (headless)
npm run test:e2e

# Run E2E tests with browser visible
npm run test:e2e:headed

# Run E2E tests in debug mode
npm run test:e2e:debug

# Run specific E2E test
npm run test:e2e -- homepage.spec.ts
```

### Run All Tests

```bash
# Run both unit and E2E tests
npm run test:all
```

## Test Structure

```
amante-coming-soon/
├── __tests__/
│   ├── unit/
│   │   ├── api/              # API route tests
│   │   │   ├── reservations.test.ts
│   │   │   ├── contact.test.ts
│   │   │   ├── private-events.test.ts
│   │   │   ├── banquets.test.ts
│   │   │   ├── feedback.test.ts
│   │   │   ├── careers.test.ts
│   │   │   └── events.test.ts
│   │   ├── components/       # Component tests
│   │   │   ├── Button.test.tsx
│   │   │   ├── Input.test.tsx
│   │   │   ├── Select.test.tsx
│   │   │   └── FileUpload.test.tsx
│   │   └── lib/              # Utility function tests
│   │       └── validations.test.ts
│   └── integration/          # Integration tests
├── e2e/                      # End-to-end tests
│   ├── homepage.spec.ts
│   ├── navigation.spec.ts
│   └── mobile.spec.ts
├── mocks/                    # MSW handlers
│   └── handlers.ts
├── vitest.config.ts          # Vitest configuration
├── vitest.setup.ts           # Test setup
├── playwright.config.ts      # Playwright configuration
└── test-utils.tsx            # Testing utilities
```

## Writing Tests

### Unit Test Example (API Route)

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/reservations/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/db-utils', () => ({
  createReservation: vi.fn(),
}));

describe('POST /api/reservations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a reservation with valid data', async () => {
    const mockReservation = { id: '123', /* ... */ };
    vi.mocked(createReservation).mockResolvedValue({
      data: mockReservation,
      error: null,
    });

    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({ /* valid data */ }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
```

### Component Test Example

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test-utils';
import Button from '@/components/ui/Button';

describe('Button Component', () => {
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Reservation Flow', () => {
  test('should complete full reservation', async ({ page }) => {
    await page.goto('/reservations');

    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="time"]', '7:00 PM');

    await page.click('button[type="submit"]');

    await expect(page.locator('text=Reservation received')).toBeVisible();
  });
});
```

## Best Practices

### General Testing Principles

1. **Test Behavior, Not Implementation**
   - Focus on what the code does, not how it does it
   - Avoid testing internal state or implementation details

2. **Write Readable Tests**
   - Use descriptive test names that explain what they test
   - Follow AAA pattern: Arrange, Act, Assert
   - Keep tests simple and focused

3. **Keep Tests Independent**
   - Each test should be able to run in isolation
   - Don't rely on test execution order
   - Clean up after each test

4. **Mock External Dependencies**
   - Mock database calls, API requests, and email services
   - Use MSW for API mocking in integration tests
   - Don't hit real external services in tests

### Component Testing

- Test user interactions, not implementation details
- Use `userEvent` for realistic user interactions
- Test accessibility (ARIA attributes, keyboard navigation)
- Test error states and loading states
- Test responsive behavior when relevant

### API Testing

- Test happy paths (valid inputs)
- Test error cases (invalid inputs, missing fields)
- Test edge cases (boundary values, special characters)
- Test authentication and authorization
- Test rate limiting if implemented

### E2E Testing

- Test complete user workflows
- Test critical business flows first
- Use page objects for complex pages
- Handle async operations properly
- Test on multiple viewports (desktop, mobile)

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:coverage

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### Pre-commit Hook

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
npm test -- --run
```

## Troubleshooting

### Common Issues

#### Tests fail with "Cannot find module"
**Solution**: Check that paths in test files use the `@/` alias correctly

#### Mock not working
**Solution**: Ensure mocks are defined before imports using `vi.mock()`

#### E2E tests timeout
**Solution**: Increase timeout in playwright.config.ts or use `test.setTimeout()`

#### Coverage not meeting threshold
**Solution**: Add tests for untested files, check coverage report with `npm run test:coverage`

#### Tests pass locally but fail in CI
**Solution**: Check environment variables, ensure dependencies are installed, verify Node version matches

### Debug Tips

```bash
# Run tests in debug mode
npm test -- --inspect-brk

# Run single test file
npm test -- path/to/test.ts

# See test output
npm test -- --reporter=verbose

# Check what files are being tested
npm test -- --reporter=verbose --run
```

## Coverage Reports

After running `npm run test:coverage`:
- HTML report: `coverage/index.html`
- Text summary: Printed to console
- LCOV format: `coverage/lcov.info`

### Coverage Thresholds

Configured in `vitest.config.ts`:
- Lines: 80%
- Functions: 80%
- Branches: 80%
- Statements: 80%

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)

## Getting Help

If you encounter issues:
1. Check this guide for common problems
2. Review test examples in the codebase
3. Check the official documentation for the testing tools
4. Ask the team for assistance

---

**Last Updated**: October 2025
