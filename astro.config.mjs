import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://hardx-87.github.io',
  base: '/portfolio',
  integrations: [tailwind(), preact()],
  experimental: {
    assets: true,
  },
});
