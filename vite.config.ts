import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ...(command === 'build'
    ? {
        build: {
          lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'MiniComponentKit',
            fileName: (format) => `index.${format}.js`,
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'styled-components'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'styled-components': 'styled',
              },
            },
          },
        },
      }
    : {
        server: {
          port: 3000,
          open: true,
        },
      }),
}));
