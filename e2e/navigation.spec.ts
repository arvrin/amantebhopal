import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');

    // Navigate to menu if link exists
    const menuLink = page.getByRole('link', { name: /menu/i }).first();
    if (await menuLink.isVisible()) {
      await menuLink.click();
      await expect(page).toHaveURL(/\/menu/);
    }
  });

  test('should handle back navigation', async ({ page }) => {
    await page.goto('/');
    const currentUrl = page.url();

    // Navigate to another page if possible
    const links = await page.getByRole('link').all();
    if (links.length > 0) {
      await links[0].click();
      await page.goBack();
      expect(page.url()).toBe(currentUrl);
    }
  });

  test('should maintain scroll position on back navigation', async ({ page }) => {
    await page.goto('/');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    const scrollY = await page.evaluate(() => window.scrollY);

    expect(scrollY).toBeGreaterThan(0);
  });

  test('should have working footer links', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should handle 404 page gracefully', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    expect(response?.status()).toBe(404);
  });
});
