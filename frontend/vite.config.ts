import react from '@vitejs/plugin-react';
import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vitest/config';

////////////////////////////////////////////////////////////////////////////////
/** https://vitejs.dev/config */
export default defineConfig({
    root: 'app',
    
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                app: 'src/index.html',
            },
        },
        sourcemap: true,
    },
    test: {
        setupFiles: 'src/testing.ts',
        environment: 'jsdom',
        globals: true,
        mockReset: true,
    },
    server: {
        open: false,
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./app/src', import.meta.url)),
        },
    },
    
    plugins: [
        react(),
    ],
});
