// import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vite';

// export default defineConfig({
// 	plugins: [sveltekit()]
// });
import type { UserConfig } from 'vite'; // Import 'UserConfig' as a type only
import { sveltekit } from '@sveltejs/kit/vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		fs: {
			strict: false // Allow accessing files outside of project root
		}
	}
};

export default config;


