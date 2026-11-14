import { defineConfig } from 'astro/config';

// Static files (images) live in public/ and are copied to the build output untouched. Everything else is an Astro page.
export default defineConfig({
  outDir: './dist',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  redirects: {
    '/strength/programs/push-pull-legs/week/': '/strength/weekly-plan/',
  },
});
