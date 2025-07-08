import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@ahmiao666/red-packet-rain-react': resolve(__dirname, '../../src/react.ts'),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    // exclude: ['@ahmiao666/red-packet-rain-react'],
    include: ['react', 'react-dom'],
  },
  define: {
    // 确保单一 React 实例
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
});
