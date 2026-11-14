import { expect, test } from './fixtures';

test.describe('strength section', () => {
  test('hub links to programs, weekly plan and evidence', async ({ page }) => {
    await page.goto('/strength/');
    for (const name of ['Programs', 'Weekly plan', 'Evidence']) {
      await expect(page.getByRole('navigation').getByRole('link', { name, exact: true }).first()).toBeVisible();
    }
  });

  test('programs page lists the three programs including the paired-muscle split', async ({ page }) => {
    await page.goto('/strength/programs/');
    await expect(page.locator('main')).toContainText(/paired/i);
    await expect(page.locator('main a[href*="/strength/programs/"]')).not.toHaveCount(0);
  });
});

test.describe('exercise filters', () => {
  test('search narrows the list, an empty result says so, and clear restores it', async ({ page }) => {
    await page.goto('/strength/exercises/');
    const count = page.locator('#count');
    const total = (await count.textContent())!.match(/\d+/)![0];
    expect(Number(total)).toBeGreaterThan(30);

    await page.getByRole('searchbox').fill('squat');
    await expect(count).not.toContainText(`${total} of ${total}`);
    const shown = await page.locator('#list > li:not([hidden])').count();
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(Number(total));

    await page.getByRole('searchbox').fill('zzzz-no-such-exercise');
    await expect(page.locator('#empty')).toBeVisible();
    await expect(page.locator('#list > li:not([hidden])')).toHaveCount(0);

    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.locator('#empty')).toBeHidden();
    await expect(page.locator('#list > li:not([hidden])')).toHaveCount(Number(total));
  });

  test('select filters combine', async ({ page }) => {
    await page.goto('/strength/exercises/');
    const all = await page.locator('#list > li:not([hidden])').count();
    await page.getByLabel('Level').selectOption({ index: 1 });
    const byLevel = await page.locator('#list > li:not([hidden])').count();
    await page.getByLabel('Muscle group').selectOption({ index: 1 });
    const both = await page.locator('#list > li:not([hidden])').count();
    expect(byLevel).toBeLessThanOrEqual(all);
    expect(both).toBeLessThanOrEqual(byLevel);
  });

  test('an exercise page shows its safety content', async ({ page }) => {
    await page.goto('/strength/exercises/');
    await page.locator('#list a').first().click();
    const body = page.locator('main');
    await expect(body).toContainText(/do not do this exercise if/i);
    await expect(body).toContainText(/regression/i);
    await expect(body).toContainText(/pain rule/i);
  });
});
