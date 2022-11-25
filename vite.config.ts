import react from '@vitejs/plugin-react';
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tools/',
  plugins: [react({ include: ['./404.html'] }), reactScopedCssPlugin()],
});
