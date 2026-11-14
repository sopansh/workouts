import { defineConfig } from 'astro/config';

// `site/` is Astro's static folder: home, core, shared assets and the 404 page are copied to the build output untouched.
export default defineConfig({
  publicDir: './site',
  outDir: './dist',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  redirects: {
    '/strength/programs/push-pull-legs/week/': '/strength/weekly-plan/',
  },
});
