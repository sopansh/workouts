import { test as base, expect, type Page } from '@playwright/test';

/** Every test fails on a console error, an uncaught exception or a failed same-origin request. */
export const test = base.extend<{ problems: string[] }>({
  problems: [
    async ({ page }, use) => {
      const problems: string[] = [];
      page.on('console', message => {
        if (message.type() === 'error') problems.push(`console: ${message.text()}`);
      });
      page.on('pageerror', error => problems.push(`exception: ${error.message}`));
      page.on('response', response => {
        const sameOrigin = response.url().startsWith('http://127.0.0.1');
        if (sameOrigin && response.status() >= 400) problems.push(`${response.status()}: ${response.url()}`);
      });
      await use(problems);
      expect(problems, 'console errors, exceptions or failed requests').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/** True when nothing makes the page wider than the viewport. */
export const hasNoHorizontalScroll = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
