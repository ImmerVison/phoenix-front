
import * as path from 'path';
import {defineConfig} from 'vite';

import UnoCSS from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';


// https://vitejs.dev/config/
export default defineConfig({

  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },

  server: {
    hmr: true,
    open: true,
  },

  plugins: [
    vue(),

    AutoImport({
      imports: ['vue', 'vue/macros'],
      // dirs: ['./src/composables/**'],
      vueTemplate: true,
      dts: './src/auto-imports.d.ts'
    }),
    Components({
      dts: './src/components.d.ts'
    }),

    UnoCSS(),
  ],
})
