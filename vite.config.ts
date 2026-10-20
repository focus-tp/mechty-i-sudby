import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const base = process.env.SITE_BASE_PATH || '/mechty-i-sudby/';
  const siteUrl = process.env.VITE_SITE_URL || 'https://focus-tp.github.io/mechty-i-sudby/';

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'site-url-metadata',
        transformIndexHtml: (html: string) => html.replaceAll('__PUBLIC_SITE_URL__', siteUrl),
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
