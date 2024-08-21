
import * as path from 'path';
import {defineConfig, loadEnv} from 'vite';

import UnoCSS from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

    switch (mode) {
        case "development":
            console.log("当前运行环境为：开发环境, 读取环境变量：" + JSON.stringify(loadEnv(mode, import.meta.url)));
            break;
        case "test":
            console.log("当前运行环境为：测试环境");
            break;
        case "production":
            console.log("当前运行环境为：生产环境");
            break;
    }


    return {
        resolve: {
            alias: {
                '~/': `${path.resolve(__dirname, 'src')}/`
            }
        },

        // server: {
        //     hmr: true,
        //     open: true,
        //     proxy: {
        //         "/api": {
        //             target: "https://ciallo.link",
        //             changeOrigin: true,
        //             rewrite: (path) => path.replace(/^\/api/, ""),
        //         },
        //
        //         "/setu": {
        //             target: "https://api.lolicon.app/setu",
        //             changeOrigin: true,
        //             rewrite: (path) => path.replace(/^\/setu/, ""),
        //         },
        //     },
        // },

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

    };
});
