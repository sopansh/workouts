import { test as plainTest } from '@playwright/test';
import { expect, test } from './fixtures';

test.describe('home page', () => {
  test('lists every section as a tile', async ({ page }) => {
    await page.goto('/home/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pick a section');
    await expect(page.getByRole('list', { name: 'Workout sections' }).getByRole('listitem')).toHaveCount(6);
  });

  test('coming-soon tiles are labelled and are not links', async ({ page }) => {
    await page.goto('/home/');
    const soon = page.locator('.tile.is-soon');
    expect(await soon.count()).toBeGreaterThan(0);
    for (const tile of await soon.all()) {
      await expect(tile).toContainText('Coming soon');
      expect(await tile.evaluate(el => el.tagName)).not.toBe('A');
    }
  });

  test('every live tile opens its section and back returns home', async ({ page }) => {
    await page.goto('/home/');
    const hrefs = await page.locator('a.tile').evaluateAll(links => links.map(link => link.getAttribute('href') ?? ''));
    expect(hrefs).toEqual(expect.arrayContaining(['/strength/', '/plyometrics/', '/core/']));
    for (const href of hrefs) {
      await page.locator(`a.tile[href="${href}"]`).click();
      await expect(page).toHaveURL(href);
      await expect(page.locator('h1')).toBeVisible();
      await page.goBack();
      await expect(page).toHaveURL(/\/home\/$/);
    }
  });

  test('the skip link is the first focusable element and moves focus to main', async ({ page }) => {
    await page.goto('/home/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });
});

// Plain Playwright `test`: a 404 response is expected here, so the failed-request guard in fixtures must not apply.
plainTest('an unknown address shows the not-found page', async ({ page }) => {
  const response = await page.goto('/no-such-page/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: /all workouts/i }).first()).toBeVisible();
});
