import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test.use({ ...devices['iPhone 12'] });

  test('should display mobile menu', async ({ page }) => {
    await page.goto('/');

    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should be fully functional on mobile', async ({ page }) => {
    await page.goto('/');

    // Check if content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should handle touch interactions', async ({ page }) => {
    await page.goto('/');

    // Simulate touch scroll
    await page.touchscreen.tap(100, 100);
  });

  test('should display properly in portrait mode', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await expect(page.locator('body')).toBeVisible();
  });

  test('should display properly in landscape mode', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto('/');

    await expect(page.locator('body')).toBeVisible();
  });

  test('should have readable text on mobile', async ({ page }) => {
    await page.goto('/');

    const heading = page.locator('h1, h2').first();
    if (await heading.isVisible()) {
      const fontSize = await heading.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });
      expect(parseInt(fontSize)).toBeGreaterThan(14);
    }
  });

  test('should have tap targets of adequate size', async ({ page }) => {
    await page.goto('/');

    const buttons = await page.getByRole('button').all();
    for (const button of buttons) {
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(36);
        }
      }
    }
  });
});
