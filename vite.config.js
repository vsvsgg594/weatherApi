import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: ['weatherapi-zybd.onrender.com'], // Allow this specific host
  },
});
