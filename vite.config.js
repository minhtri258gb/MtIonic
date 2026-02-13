import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	optimizeDeps: {
		exclude: ['@ionic/core'],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: undefined,
			},
			external: ['/ionic.esm.js'],
		},
	},
	plugins: [
		viteStaticCopy({
			targets: [{ src: 'node_modules/@ionic/core/dist/ionic/*', dest: '' }],
		}),
		VitePWA({
			registerType: 'autoUpdate',
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'sw.js',
			includeAssets: ['vite.svg'],
			manifest: {
				name: 'MT Ionic PWA',
				short_name: 'MtIonic',
				icons: [
					{ src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
					{ src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
				]
			},
			devOptions: {
				enabled: true,
				type: 'module',
			}
		}),
	],
});