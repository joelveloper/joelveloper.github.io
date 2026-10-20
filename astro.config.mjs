// @ts-check
import { fileURLToPath } from 'node:url';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://joelveloper.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return pathname !== '/404/' && pathname !== '/404.html';
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
