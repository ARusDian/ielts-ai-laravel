import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy'
import babel from 'vite-plugin-babel'
import replace from '@rollup/plugin-replace';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        legacy({
            targets: ['defaults', 'not IE 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
        babel({
            babelConfig: {
                babelrc: false,
                configFile: false,
                plugins: ['@babel/plugin-transform-runtime'],
            }
        }),
        replace({
            'Object.defineProperty(exports, "__esModule", { value: true });':
                'Object.defineProperty(exports || {}, "__esModule", { value: true });',
            delimiters: ['\n', '\n'],
            preventAssignment: true,
        }),
    ],
});
