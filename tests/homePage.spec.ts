/** @format */

import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/', { waitUntil: 'domcontentloaded' });
		await page.waitForSelector('[data-id="home-title"]');
	});

	test('should load the page and display title/subtitle', async ({ page }) => {
		const title = page.locator('[data-id="home-title"]');
		const subtitle = page.locator('[data-id="home-subtitle"]');

		await expect(title).toBeVisible();
		await expect(subtitle).toBeVisible();
		await expect(title).toHaveClass(/text-4xl font-bold mb-4/);
		await expect(subtitle).toHaveClass(/text-xl mb-8/);
	});

	test('should have a properly styled Sign In button', async ({ page }) => {
		const signInLink = page.locator('[data-id="sign-in-link"]');

		await expect(signInLink).toBeVisible();
		await expect(signInLink).toHaveAttribute('href', '/sign-in');

		await expect(signInLink).toHaveClass(/py-2 px-4 rounded-xl border/);
	});

	test('should navigate to /sign-in when clicking Sign In', async ({ page }) => {
		await page.click('[data-id="sign-in-link"]');
		await page.waitForURL('/sign-in');
		await expect(page).toHaveURL('/sign-in');
	});

	test('should have proper layout structure', async ({ page }) => {
		const mainContainer = page.locator('.flex.flex-col.items-center.justify-center.min-h-screen');
		await expect(mainContainer).toBeVisible();
		const buttonContainer = page.locator('.space-x-4');
		await expect(buttonContainer).toBeVisible();
	});
});
