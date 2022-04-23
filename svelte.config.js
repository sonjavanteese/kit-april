import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';

import adapter from '@sveltejs/adapter-static';

import mdsvexConfig from './mdsvex.config.js';

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
    //   base: ""
    // },
    vite: {
      plugins: [WindiCSS()],
    },
  },
};

export default config;
