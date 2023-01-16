import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	alias: {
	  '@': '/src',
	},
	proxy: {
	  '/api': {
		  target: 'http://localhost:3000',
		changeOrigin: true,
	  },
	},
	public: 'static'
};


export default config;
