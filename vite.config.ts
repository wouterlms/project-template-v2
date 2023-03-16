import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

import { VitePWA } from 'vite-plugin-pwa'
import { checker } from 'vite-plugin-checker'

import createRouteMap from '@wouterlms/create-route-map'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        icons: [
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    Components({
      dirs: ['./src'],
      dts: true,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
      ],
      vueTemplate: true,
    }),
    vueI18n({
      include: './src/i18n/locales/**',
      runtimeOnly: false,
    }),
    checker({
      typescript: true,
    }),
    createRouteMap({
      basePath: './src',
      outputPath: './enums/Route.enum.ts',
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
  server: {
    port: 3000,
  },
})
