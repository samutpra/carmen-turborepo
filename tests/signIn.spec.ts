/** @format */

import { test, expect } from '@playwright/test';

test.describe('SignIn', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/sign-in');
	});

	test('should load the page and display title/subtitle', async ({ page }) => {
		await expect(page.locator('[data-id="sign-in-title"]')).toBeVisible();
		await expect(page.locator('[data-id="sign-in-description"]')).toBeVisible();
	});

	test('should load the sign-in form with all fields', async ({ page }) => {
		await expect(page.locator('[data-id="sign-in-form"]')).toBeVisible();
		await expect(page.locator('[data-id="username-input"]')).toBeVisible();
		await expect(page.locator('[data-id="password-input"]')).toBeVisible();
		await expect(page.locator('[data-id="sign-in-button"]')).toBeVisible();
	});

	test('should show validation errors for empty fields', async ({ page }) => {
		await page.waitForSelector('[data-id="sign-in-button"]');
		await page.click('[data-id="sign-in-button"]');
		await expect(page.locator('[data-id="username-input"]')).toHaveAttribute('aria-invalid', 'true');
		await expect(page.locator('[data-id="password-input"]')).toHaveAttribute('aria-invalid', 'true');
	});

	test('should allow input in username and password fields', async ({ page }) => {
		await page.waitForSelector('[data-id="username-input"]');
		await page.waitForSelector('[data-id="password-input"]');

		const testEmail = 'daew@carmensoftware.com';
		const testPassword = 'Daew2222';

		await page.fill('[data-id="username-input"]', testEmail);
		await page.fill('[data-id="password-input"]', testPassword);

		await expect(page.locator('[data-id="username-input"]')).toHaveValue(testEmail);
		await expect(page.locator('[data-id="password-input"]')).toHaveValue(testPassword);
	});

	test('should navigate to /dashboard on successful login', async ({ page }) => {
		await page.waitForSelector('[data-id="username-input"]');

		await page.fill('[data-id="username-input"]', 'daew@carmensoftware.com');
		await page.fill('[data-id="password-input"]', 'Daew2222');

		await page.waitForURL('/dashboard', { timeout: 10000 });
		await expect(page).toHaveURL('/dashboard');
	});

	test('should handle successful API sign-in', async ({ request, page }) => {
		await page.waitForSelector('[data-id="username-input"]');

		const testCredentials = {
			email: 'daew@carmensoftware.com',
			password: 'Daew2222',
		};

		const signInResponse = await request.post('/api/auth/sign-in', {
			data: testCredentials,
		});

		expect(signInResponse.ok()).toBeTruthy();
		const responseData = await signInResponse.json();
		expect(responseData).toHaveProperty('success', true);

		await page.fill('[data-id="username-input"]', testCredentials.email);
		await page.fill('[data-id="password-input"]', testCredentials.password);
		await page.click('[data-id="sign-in-button"]');

		await page.waitForURL('/dashboard', { timeout: 10000 });
		await expect(page).toHaveURL('/dashboard');
	});

	test('should handle failed API sign-in', async ({ request, page }) => {
		const invalidCredentials = {
			email: 'invalid@example.com',
			password: 'wrongpassword',
		};

		const signInResponse = await request.post('/api/auth/sign-in', {
			data: invalidCredentials,
		});

		expect(signInResponse.ok()).toBeFalsy();
		const responseData = await signInResponse.json();
		expect(responseData).toHaveProperty('success', false);

		await page.fill('[data-id="username-input"]', invalidCredentials.email);
		await page.fill('[data-id="password-input"]', invalidCredentials.password);
		await page.click('[data-id="sign-in-button"]');

		await expect(page.locator('[data-id="sign-in-error"]')).toBeVisible();
		await expect(page).toHaveURL('/sign-in');
	});

	test('should handle API network errors', async ({ request, page }) => {
		await page.route('/api/auth/sign-in', (route) =>
			route.fulfill({
				status: 500,
				body: JSON.stringify({ message: 'Internal server error' }),
			})
		);

		await page.fill('[data-id="username-input"]', 'test@example.com');
		await page.fill('[data-id="password-input"]', 'password123');
		await page.click('[data-id="sign-in-button"]');

		await expect(page.locator('[data-id="sign-in-error"]')).toBeVisible();
		await expect(page).toHaveURL('/sign-in');
	});
});
