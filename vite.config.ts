import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'src/pages/contact/index.html'),
        map: resolve(__dirname, 'src/pages/map/index.html'),
        register: resolve(__dirname, 'src/pages/register/index.html'),
        zoos: resolve(__dirname, 'src/pages/zoos/panda.html'),
      }
    }
  }
});