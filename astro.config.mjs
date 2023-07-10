import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://vytalyi.github.io',
  base: '/portfolio',
  integrations: [tailwind(), preact()],
  experimental: {
    assets: true,
  },
});
