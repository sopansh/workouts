import { expect, test } from './fixtures';

test.describe('plyometrics section', () => {
  test('is reachable from home and shows the safety notice before the plan', async ({ page }) => {
    await page.goto('/home/');
    await page.locator('a.tile[href="/plyometrics/"]').click();
    await expect(page).toHaveURL('/plyometrics/');
    await expect(page.locator('main')).toContainText(/clearance|pain|medical/i);
  });

  for (const sub of ['weekly-plan', 'exercises', 'progression', 'fascia']) {
    test(`/${sub}/ is linked from the section navigation`, async ({ page }) => {
      await page.goto('/plyometrics/');
      await page.locator(`nav a[href="/plyometrics/${sub}/"]`).first().click();
      await expect(page).toHaveURL(`/plyometrics/${sub}/`);
      await expect(page.locator('h1')).toBeVisible();
    });
  }
});

test.describe('getting started section', () => {
  test('opens from the home tile and the weekly plan renders eight weeks', async ({ page }) => {
    await page.goto('/home/');
    await page.locator('a.tile[href="/getting-started/"]').click();
    await expect(page).toHaveURL('/getting-started/');
    await page.locator('nav a[href="/getting-started/weekly-plan/"]').first().click();
    await expect(page.locator('main')).toContainText(/week 8/i);
  });
});
