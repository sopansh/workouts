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

test.describe('calisthenics: lifters page', () => {
  test('has the placement table, the fast-start week and the safety notices', async ({ page }) => {
    await page.goto('/calisthenics/lifters/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('If you already lift');
    await expect(page.locator('main')).toContainText('Every number in this table is a coaching convention.');
    await expect(page.locator('main')).toContainText('do not add volume on top of the plan in weeks 1 and 2');
    await expect(page.locator('main')).toContainText(/Check before you start/);
    await expect(page.locator('main')).toContainText(/First skills are coaching convention/);
    await expect(page.locator('main')).toContainText('No number opens a skill');
    const placement = page.getByRole('region', { name: 'Where to test first, by ladder' });
    await expect(placement.locator('tbody tr')).toHaveCount(12);
    const fastStart = page.getByRole('region', { name: 'Fast-start week' });
    await expect(fastStart.locator('a[href="/calisthenics/weekly-plan/#session-foundations-A-title"]').first()).toBeVisible();
  });

  test('cites graded claims that exist on the same page', async ({ page }) => {
    await page.goto('/calisthenics/lifters/');
    const hrefs = await page.locator('a[href^="#claim-cal-"]').evaluateAll(links => links.map(link => link.getAttribute('href') ?? ''));
    expect(hrefs.length).toBeGreaterThanOrEqual(5);
    for (const href of hrefs) await expect(page.locator(href)).toHaveCount(1);
    await page.goto('/calisthenics/evidence/#claim-cal-wrist-neutral');
    await expect(page.locator('#claim-cal-wrist-neutral')).toBeInViewport();
  });
});

test.describe('calisthenics: first weeks page', () => {
  test('explains the first weeks and offers a tracker that stores nothing', async ({ page }) => {
    await page.goto('/calisthenics/first-weeks/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('The first weeks, and sticking with it');
    await expect(page.locator('main')).toContainText('A short session counts as a session.');
    await expect(page.locator('main')).toContainText('This page stores nothing and runs no script.');
    await expect(page.locator('main')).toContainText('Do not double up.');
    const tracker = page.getByRole('region', { name: 'Weekly tracker template' });
    await expect(tracker.locator('thead th')).toHaveCount(9);
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/21 days|streak/i);
  });

  test('is reachable from the section navigation, as is the lifters page', async ({ page }) => {
    await page.goto('/calisthenics/');
    await expect(page.locator('nav a[href="/calisthenics/lifters/"]').first()).toHaveCount(1);
    await expect(page.locator('nav a[href="/calisthenics/first-weeks/"]').first()).toHaveCount(1);
  });
});

test.describe('exercise cards with two pain rules', () => {
  test('the push-up card links to shoulder and wrist, the side plank to shoulder and lower back', async ({ page }) => {
    await page.goto('/calisthenics/exercises/');
    const pushUp = page.locator('#cal-push-up');
    await expect(pushUp.locator('a[href="#pain-shoulder"]')).toHaveCount(1);
    await expect(pushUp.locator('a[href="#pain-wrist"]')).toHaveCount(1);
    const sidePlank = page.locator('#cal-side-plank-full');
    await expect(sidePlank.locator('a[href="#pain-shoulder"]')).toHaveCount(1);
    await expect(sidePlank.locator('a[href="#pain-lower-back"]')).toHaveCount(1);
    await expect(page.locator('#pain-wrist')).toBeAttached();
  });

  test('getting-started side plank shows both rules', async ({ page }) => {
    await page.goto('/getting-started/exercises/');
    const card = page.locator('#side-plank-knees');
    await expect(card.locator('a[href="#pain-shoulder"]')).toHaveCount(1);
    await expect(card.locator('a[href="#pain-lower-back"]')).toHaveCount(1);
  });
});

