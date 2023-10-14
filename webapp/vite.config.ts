import react from '@vitejs/plugin-react';
import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vitest/config';

////////////////////////////////////////////////////////////////////////////////
/** https://vitejs.dev/config */
export default defineConfig({
    root: 'src',
    
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                app: 'index.html',
            },
        },
        sourcemap: true,
    },
    test: {
        setupFiles: 'testing.ts',
        environment: 'jsdom',
        globals: true,
        mockReset: true,
    },
    server: {
        open: false,
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    
    plugins: [
        react(),
    ],
});
