import { expect, test } from './fixtures';

for (const path of ['/home/', '/strength/', '/core/']) {
  test.describe(`theme on ${path}`, () => {
    test.use({ colorScheme: 'light' });

    test('toggle switches theme, updates its label and persists across reload', async ({ page }) => {
      await page.goto(path);
      const toggle = page.locator('#theme');
      await expect(toggle).toHaveAttribute('aria-label', 'Switch to dark theme');

      await toggle.click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      await expect(toggle).toHaveAttribute('aria-label', 'Switch to light theme');

      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });
  });
}

test.describe('theme defaults', () => {
  test.use({ colorScheme: 'dark' });

  test('follows the system setting until the visitor chooses', async ({ page }) => {
    await page.goto('/home/');
    await expect(page.locator('#theme')).toHaveAttribute('aria-label', 'Switch to light theme');
    const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(background).not.toBe('rgb(255, 255, 255)');
  });
});
