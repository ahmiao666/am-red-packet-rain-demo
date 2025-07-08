import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@ahmiao666/red-packet-rain-vue': resolve(__dirname, '../../src/vue.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['@ahmiao666/red-packet-rain-vue'],
  },
})
