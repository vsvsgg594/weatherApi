import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',  // Allows access from any network
    port: 5173,        // Change this if another process is using 5173
    strictPort: true,  // Ensures Vite doesn't switch to another port
  },
});
