import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into a separate chunk
          vendor: [
            'react', 
            'react-dom',
            'react-router-dom',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-menu',
            '@radix-ui/react-popover'
          ],
          // Add other dependency groups as needed
        }
      }
    },
    // Increase the warning threshold if needed
    chunkSizeWarningLimit: 1000, // in kilobytes
    // Optimize large assets
    assetsInlineLimit: 4096, // 4kb - files smaller than this will be inlined as base64
  }
})