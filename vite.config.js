import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: ['weatherapi-zybd.onrender.com1'], // Allow this specific host
  },
});
