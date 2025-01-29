/** @format */

import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the homepage and wait for the content to load
		await page.goto('/', { waitUntil: 'domcontentloaded' });
		await page.waitForSelector('[data-id="home-title"]');
	});

	test('should load the page and display title/subtitle', async ({ page }) => {
		// Ensure title and subtitle are visible and have correct content
		const title = page.locator('[data-id="home-title"]');
		const subtitle = page.locator('[data-id="home-subtitle"]');

		await expect(title).toBeVisible();
		await expect(subtitle).toBeVisible();

		// Verify the elements have the correct styling classes
		await expect(title).toHaveClass(/text-4xl font-bold mb-4/);
		await expect(subtitle).toHaveClass(/text-xl mb-8/);
	});

	test('should have a properly styled Sign In button', async ({ page }) => {
		const signInLink = page.locator('[data-id="sign-in-link"]');

		// Check visibility and attributes
		await expect(signInLink).toBeVisible();
		await expect(signInLink).toHaveAttribute('href', '/sign-in');

		// Verify the styling classes
		await expect(signInLink).toHaveClass(/py-2 px-4 rounded-xl border/);
	});

	test('should navigate to /sign-in when clicking Sign In', async ({ page }) => {
		// Click the Sign In button
		await page.click('[data-id="sign-in-link"]');

		// Wait for and verify navigation
		await page.waitForURL('/sign-in');
		await expect(page).toHaveURL('/sign-in');
	});

	test('should have proper layout structure', async ({ page }) => {
		// Verify the main container has correct layout classes
		const mainContainer = page.locator('.flex.flex-col.items-center.justify-center.min-h-screen');
		await expect(mainContainer).toBeVisible();

		// Verify the button container has correct spacing
		const buttonContainer = page.locator('.space-x-4');
		await expect(buttonContainer).toBeVisible();
	});
});
