import react from '@vitejs/plugin-react';
import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    // server: {
    //     open: true,
    // },
    // build: {
    //     outDir: "build",
    //     sourcemap: true,
    // },
    // test: {
    //     globals: true,
    //     environment: "jsdom",
    //     setupFiles: "src/setupTests",
    //     mockReset: true,
    // },
});
