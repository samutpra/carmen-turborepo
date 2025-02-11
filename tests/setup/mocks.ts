/** @format */

import { test as base } from '@playwright/test';

export const test = base.extend({
	page: async ({ page }, use) => {
		// Mock the sign-in API response
		await page.route('**/api/auth/sign-in', async (route) => {
			await route.fulfill({
				status: 200,
				body: JSON.stringify({
					success: true,
					// Add whatever response data your app expects
				}),
			});
		});

		await use(page);
	},
});
