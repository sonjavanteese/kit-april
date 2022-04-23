import { mdsvex } from 'mdsvex';
// import adapter from 'svelte-adapter-github';
import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';

import adapter from '@sveltejs/adapter-static';

import mdsvexConfig from './mdsvex.config.js';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess(), mdsvex(mdsvexConfig)],

  kit: {
    adapter: adapter({
			fallback: '200.html'
		}),
    // paths: {
		// 	base: dev ? '' : '/kit-april-page'
		// },
    // appDir: 'internal',
		// If you are not using a .nojekyll file, change your appDir to something not starting with an underscore.
		// For example, instead of '_app', use 'app_', 'internal', etc.
    vite: {
      plugins: [WindiCSS()],
    },
  },
};

export default config;
