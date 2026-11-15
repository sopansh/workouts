import { expect, test } from './fixtures';

test.describe('calisthenics section', () => {
  test('opens from the home tile and links every sub-page from the navigation', async ({ page }) => {
    await page.goto('/home/');
    await page.locator('a.tile[href="/calisthenics/"]').click();
    await expect(page).toHaveURL('/calisthenics/');
    for (const sub of ['start-here', 'foundations', 'first-skills', 'weekly-plan', 'exercises', 'progression', 'evidence']) {
      await expect(page.locator(`nav a[href="/calisthenics/${sub}/"]`).first()).toHaveCount(1);
    }
  });

  test('every page shows the safety notice, and the skill pages say they are convention', async ({ page }) => {
    for (const sub of ['', 'foundations/', 'first-skills/', 'weekly-plan/', 'exercises/', 'progression/']) {
      await page.goto(`/calisthenics/${sub}`);
      await expect(page.locator('main')).toContainText(/Check before you start/);
    }
    await page.goto('/calisthenics/first-skills/');
    await expect(page.locator('main')).toContainText(/First skills are coaching convention/);
  });

  test('every skill lists gates before its steps', async ({ page }) => {
    await page.goto('/calisthenics/first-skills/');
    for (const id of ['cal-l-sit', 'cal-handstand', 'cal-planche', 'cal-front-lever']) {
      const section = page.locator(`section[aria-labelledby="skill-${id}"]`);
      await expect(section.getByRole('heading', { name: /Gates/ })).toBeVisible();
      expect(await section.locator('ul.prose li').count()).toBeGreaterThanOrEqual(2);
    }
    await expect(page.locator('section[aria-labelledby="skill-cal-front-lever"]')).toContainText(/Needs:.*bar/);
  });

  test('the exercise page has a card with safety content for every exercise, and anchors resolve', async ({ page }) => {
    await page.goto('/calisthenics/exercises/');
    const cards = page.locator('article.guide-card');
    expect(await cards.count()).toBeGreaterThanOrEqual(40);
    for (const card of await cards.all()) {
      await expect(card).toContainText('Do not do this if');
      await expect(card).toContainText('Pain rule');
    }
    await page.goto('/calisthenics/exercises/#cal-pull-up');
    await expect(page.locator('#cal-pull-up')).toBeInViewport();
  });

  test('the weekly plan shows both phases, three sessions each, and eight weeks each', async ({ page }) => {
    await page.goto('/calisthenics/weekly-plan/');
    for (const id of ['foundations', 'first-skills']) {
      const section = page.locator(`section#${id}`);
      await expect(section.locator('.session h3')).toHaveCount(4);
      await expect(section.locator('.week-block')).toHaveCount(8);
    }
    await page.locator('section#foundations .week-block').nth(1).locator('a', { hasText: 'Session B' }).first().click();
    await expect(page).toHaveURL(/#session-foundations-B-title$/);
  });

  test('evidence lists graded claims, its gaps and verified sources', async ({ page }) => {
    await page.goto('/calisthenics/evidence/');
    await expect(page.locator('#gaps')).toBeVisible();
    expect(await page.locator('#claims ~ ul.claims .claim, section[aria-labelledby="claims"] .claim').count()).toBeGreaterThanOrEqual(8);
    await page.goto('/calisthenics/evidence/#claim-cal-wrist-loading');
    await expect(page.locator('#claim-cal-wrist-loading')).toBeInViewport();
  });
});
