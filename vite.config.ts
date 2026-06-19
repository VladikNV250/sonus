import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        tailwindcss(),
        reactRouter(),
        basicSsl(),
        tsconfigPaths(),
        VitePWA({
            registerType: 'autoUpdate',

            injectRegister: 'auto',

            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

                runtimeCaching: [
                    {
                        urlPattern: /\/api\//,
                        handler: 'NetworkOnly',
                    },
                ],
            },

            manifest: {
                name: 'Sonus',
                short_name: 'Sonus',
                description: 'Guitar tuner app',
                theme_color: '#0f0f0f',
                background_color: '#0f0f0f',
                display: 'standalone',
                orientation: 'portrait',
                scope: '/',
                start_url: '/',
                icons: [
                    {
                        src: '/icons/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-512-maskable.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },

            devOptions: {
                enabled: true,
                type: 'module',
            },
        }),
    ],
})
