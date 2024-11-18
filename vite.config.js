import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/repository/', // Ganti 'repository' dengan nama repositori GitHub Anda
});
