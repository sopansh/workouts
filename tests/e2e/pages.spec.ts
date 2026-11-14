import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { expect, hasNoHorizontalScroll, test } from './fixtures';

const dist = path.join(import.meta.dirname, '..', '..', 'dist');

/** Every built page, as a URL path, so a new page is covered without editing this file. */
function builtPages(dir = dist): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return builtPages(full);
    if (entry.name !== 'index.html') return [];
    const url = '/' + path.relative(dist, dir).split(path.sep).join('/');
    return [url === '/' ? '/' : `${url}/`];
  });
}

const isRedirect = (url: string) => readFileSync(path.join(dist, url, 'index.html'), 'utf8').includes('http-equiv="refresh"');
const redirects = builtPages().filter(isRedirect);
const pages = builtPages().filter(url => !isRedirect(url));

test.describe('every page', () => {
  test('the build produced pages', () => {
    expect(pages.length).toBeGreaterThan(100);
  });

  for (const url of pages) {
    test(`${url} loads cleanly`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main#main')).toBeVisible();
      await expect(page).toHaveTitle(/\S/);
      expect(await hasNoHorizontalScroll(page), 'horizontal scroll').toBe(true);
    });
  }
});

test.describe('redirects', () => {
  for (const url of redirects) {
    test(`${url} lands on a real page`, async ({ page }) => {
      await page.goto(url);
      await page.waitForURL(target => target.pathname !== url);
      await expect(page.locator('h1')).toHaveCount(1);
    });
  }
});
