
import * as path from 'path';
import {defineConfig, loadEnv} from 'vite';

import UnoCSS from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
    proxy: {
      "/api": {
        target: "https://ciallo.link",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  plugins: [
    vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue/macros'],
      // dirs: ['./src/composables/**'],
      vueTemplate: true,
      dts: './src/auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: './src/components.d.ts'
    }),

    UnoCSS(),
  ],

})
