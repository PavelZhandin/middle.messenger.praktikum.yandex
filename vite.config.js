import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  base: '',
  root: resolve(__dirname, 'src'),
  publicDir: 'public',
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  rollupOptions: {
    input: {
      index: resolve(__dirname, 'src/index.html'),
    },
  },
  plugins: [
    handlebars({}),
  ],
});
