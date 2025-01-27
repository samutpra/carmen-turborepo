import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		experimentalStudio: true,
	},
	projectId: 'ue3yuj',
	component: {
		devServer: {
			framework: 'next',
			bundler: 'webpack',
		},
	},
});
