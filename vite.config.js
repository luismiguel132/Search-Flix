import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        details: 'movie-details.html',
        favoritos: 'filmesFavoritos.html',
        login: 'login.html',
        register: 'register.html',
        profile: 'profile.html',
      },
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    },
  },
});
