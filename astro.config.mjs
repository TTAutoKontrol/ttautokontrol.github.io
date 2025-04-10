import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ttautokontrol.github.io',
  base: '/ttautokontrol.github.io/',
  integrations: [
    tailwind(),
  ],
}); 