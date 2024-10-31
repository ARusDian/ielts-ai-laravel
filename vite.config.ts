import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy'
import babel from 'vite-plugin-babel'
import replace from '@rollup/plugin-replace';
// import nodeExternals from 'vite-plugin-node-externals';
import commonjs from '@originjs/vite-plugin-commonjs'


console.log("Vite Config Loaded");

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        // commonjs(),
        // nodeExternals({
        //     // Pastikan untuk mengatur options sesuai kebutuhan
        //     // Jika Anda perlu mengecualikan modul tertentu, Anda bisa menambahkannya di sini
        // }),
        // legacy({
        //     targets: ['defaults', 'not IE 11'],
        //     additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        // }),
        // babel({
        //     babelConfig: {
        //         babelrc: false,
        //         configFile: false,
        //         plugins: ['@babel/plugin-transform-runtime'],
        //     }
        // }),
        // replace({
        //     'Object.defineProperty(exports, "__esModule", { value: true });':
        //         'Object.defineProperty(exports || {}, "__esModule", { value: true });',
        //     delimiters: ['\n', '\n'],
        //     preventAssignment: true,
        // }),
    ],

    // my
    // resolve: {
    //     alias: {
    //         // Alihkan jika Anda perlu
    //         // 'openai': 'openai/dist/index.js', // Alihkan ke path yang benar
    //         // 'openai': './Applications/MAMP/htdocs/ielts-ai-laravel/node_modules/openai/index.ts', // Alihkan ke path yang benar
    //         // 'SpeechRecognition' : './Applications/MAMP/htdocs/ielts-ai-laravel/node_modules/openai/index',
    //     },
    // },
    build: {
        minify: false, // Nonaktifkan minifikasi untuk debugging
    },
});
