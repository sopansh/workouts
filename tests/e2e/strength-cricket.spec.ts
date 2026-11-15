import { expect, test } from './fixtures';

const base = '/strength/cricket/';

test.describe('strength cricket pages', () => {
  test('the overview says what is researched and links the plyometrics cricket section', async ({ page }) => {
    await page.goto(base);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Strength for cricket');
    for (const heading of ['What is researched now', 'The plyometrics cricket section', 'How to read the evidence here', 'Not published, and not searched']) {
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    }
    await expect(page.locator('a[href="/plyometrics/sports/cricket/"]').first()).toBeVisible();
    await expect(page.locator('main')).toContainText('Education, not a programme.');
    await expect(page.locator('main')).toContainText('Researched draft');
    await expect(page.locator('main')).toContainText('Stub, ');
  });

  for (const [id, title] of [['fast-bowlers', 'Fast bowlers'], ['batters', 'Batters'], ['injury-prevention', 'Injury prevention'], ['season-planning', 'Season planning']]) {
    test(`${id} is a researched draft that says what it is not`, async ({ page }) => {
      await page.goto(`${base}${id}/`);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(title.split(' ')[0]);
      await expect(page.locator('.eyebrow')).toContainText('Researched');
      await expect(page.locator('aside.note')).toContainText('Draft, researched from abstracts.');
      await expect(page.locator('main')).not.toContainText('Stub page.');
      await expect(page.locator('main')).toContainText('It is not for under-18s');
      await expect(page.getByRole('heading', { name: 'Working hypotheses: demands' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'What is not known' })).toBeVisible();
      const claimLinks = await page.locator('a[href^="#claim-cricket-"]').evaluateAll(links => links.map(link => link.getAttribute('href') ?? ''));
      for (const href of claimLinks) await expect(page.locator(href)).toHaveCount(1);
    });
  }

  test('fast bowlers links the shared exercise and the plyometrics section, and calls the strength block a convention', async ({ page }) => {
    await page.goto(`${base}fast-bowlers/`);
    await expect(page.getByRole('heading', { name: 'A short strength block (a convention)' })).toBeVisible();
    await expect(page.locator('main')).toContainText('It is not a programme shown to work for bowlers.');
    await expect(page.locator('a[href="/strength/exercises/nordic-curl/"]').first()).toBeVisible();
    await expect(page.locator('a[href="/plyometrics/sports/cricket/"]').first()).toBeVisible();
    await expect(page.locator('#claim-cricket-club-pace-combined-training')).toHaveCount(1);
  });

  test('season planning states that nothing is a study result', async ({ page }) => {
    await page.goto(`${base}season-planning/`);
    await expect(page.getByRole('heading', { name: 'A season outline (a convention)' })).toBeVisible();
    await expect(page.locator('main')).toContainText('Nothing here is a study result.');
  });

  for (const id of ['spin-bowlers', 'fielders', 'wicketkeepers']) {
    test(`${id} stays an honest stub`, async ({ page }) => {
      await page.goto(`${base}${id}/`);
      await expect(page.locator('.eyebrow')).toContainText('Stub');
      await expect(page.locator('main')).toContainText('Stub, with no exercise selection.');
    });
  }
});
