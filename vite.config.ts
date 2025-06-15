import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/FocusBeats/', // ✅ ONLY the repo name with slashes
});
