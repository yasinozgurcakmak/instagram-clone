import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip', 
      ext: '.gz', 
      threshold: 10240,
      deleteOriginFile: false, 
    }),
  ],
  server:{
    port:3000
  },
  build: {
    target: 'esnext', 
    minify: 'esbuild', 
    cssCodeSplit: true, 
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  esbuild: {
    treeShaking: true, 
  },
})
