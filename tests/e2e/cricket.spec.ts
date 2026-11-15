import { expect, test } from './fixtures';

const base = '/plyometrics/sports/cricket/';
const section = (id: string) => `section[aria-labelledby="${id}"]`;

test.describe('cricket pages under plyometrics', () => {
  test('are reachable from the plyometrics navigation', async ({ page }) => {
    await page.goto('/plyometrics/');
    await page.locator(`nav a[href="${base}"]`).first().click();
    await expect(page).toHaveURL(base);
    await expect(page).toHaveTitle(/Cricket · Plyometrics · Workouts/);
  });

  test('the hub states who it is for, the demands as hypotheses and the draft label', async ({ page }) => {
    await page.goto(base);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cricket: power, rotation and injury-prevention education');
    await expect(page.locator('main')).toContainText('Draft: education, not treatment');
    await expect(page.locator(section('demands'))).toBeVisible();
    await expect(page.locator(`${section('demands')} tbody tr`)).toHaveCount(5);
    await expect(page.locator(section('red-flags'))).toBeVisible();
    for (const sub of ['power', 'rotation-and-core', 'injury-prevention', 'evidence']) {
      await expect(page.locator(`main a[href="${base}${sub}/"]`).first()).toBeVisible();
    }
  });

  test('the power page lists eleven gated cards, each with a regression and a pain rule', async ({ page }) => {
    await page.goto(`${base}power/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Power: landing, hops and stopping');
    const cards = page.locator('article.guide-card');
    await expect(cards).toHaveCount(11);
    for (const card of await cards.all()) {
      await expect(card).toContainText('Do not do this if');
      await expect(card).toContainText(/Pain rules?:/);
    }
    await expect(page.locator(section('gates'))).toBeVisible();
    await expect(page.locator(section('contacts'))).toContainText('Session A, top levels');
    await page.goto(`${base}power/#cricket-single-leg-hop-stick`);
    await expect(page.locator('#cricket-single-leg-hop-stick')).toBeInViewport();
  });

  test('the rotation page puts anti-rotation first and links the shared cards', async ({ page }) => {
    await page.goto(`${base}rotation-and-core/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Rotation and core: anti-rotation first, rotation last');
    await expect(page.locator('article.guide-card')).toHaveCount(4);
    await expect(page.locator(`${section('anti')} tbody tr`)).toHaveCount(6);
    await expect(page.locator(`${section('anti')} a[href="/getting-started/exercises/#dead-bug"]`)).toHaveCount(1);
    await expect(page.locator('main')).toContainText('/core/');
  });

  test('the injury page is education with referral tiers and states the population studied', async ({ page }) => {
    await page.goto(`${base}injury-prevention/`);
    await expect(page.locator(section('red-flags'))).toBeVisible();
    await expect(page.locator(`${section('red-flags')} tbody tr`)).toHaveCount(3);
    expect(await page.getByText('Population studied:').count()).toBeGreaterThanOrEqual(6);
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/\b(prevents|heals|cures|injury-proof|bulletproof)\b/i);
  });

  test('the evidence page lists claims and withholds two sources', async ({ page }) => {
    await page.goto(`${base}evidence/`);
    await expect(page.locator(section('withheld'))).toContainText('10.');
    expect(await page.locator('article.claim').count()).toBeGreaterThanOrEqual(40);
  });

  test('the base plyometrics pages do not show cricket evidence', async ({ page }) => {
    await page.goto('/plyometrics/fascia/');
    await expect(page.locator('main')).not.toContainText(/fast bowler/i);
    expect(await page.locator('article.claim').count()).toBeLessThanOrEqual(6);
  });
});
