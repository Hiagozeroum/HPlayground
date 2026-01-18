import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
const enableDevtools = true
const devTools = enableDevtools ? vueDevTools() : null
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Only load vueDevTools when not running Storybook (it conflicts with Storybook's build)
    ...(process.env.npm_lifecycle_script?.includes('storybook') ? [] : [devTools]),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
