import react from '@vitejs/plugin-react';
import path from 'node:path';
import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vitest/config';

// https://vitejs.dev/config
export default defineConfig({
    plugins: [
        react(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            "/src": path.resolve(process.cwd(), "src"),
        },
    },
    server: {
        open: false,
    },
    root: 'src',
    build: {
        outDir: '../dist',
        sourcemap: true,
        rollupOptions: {
            input: {
                app: 'index.html',
            },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'testing.ts',
        mockReset: true,
    },
});
