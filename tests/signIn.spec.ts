/** @format */

import { test, expect } from '@playwright/test';

test.describe('SignIn', () => {
	// Before each test, navigate to sign-in page
	test.beforeEach(async ({ page }) => {
		await page.goto('/sign-in');
	});

	test('should load the page and display title/subtitle', async ({ page }) => {
		// Check for title and description
		await expect(page.locator('[data-id="sign-in-title"]')).toBeVisible();
		await expect(page.locator('[data-id="sign-in-description"]')).toBeVisible();
	});

	test('should load the sign-in form with all fields', async ({ page }) => {
		// Wait for form to be visible first
		await expect(page.locator('[data-id="sign-in-form"]')).toBeVisible();

		// Check for form elements
		await expect(page.locator('[data-id="username-input"]')).toBeVisible();
		await expect(page.locator('[data-id="password-input"]')).toBeVisible();
		await expect(page.locator('[data-id="sign-in-button"]')).toBeVisible();
	});

	test('should show validation errors for empty fields', async ({ page }) => {
		// Wait for form to be ready
		await page.waitForSelector('[data-id="sign-in-button"]');

		// Click sign in without filling fields
		await page.click('[data-id="sign-in-button"]');

		// Check for validation errors
		await expect(page.locator('[data-id="username-input"]')).toHaveAttribute('aria-invalid', 'true');
		await expect(page.locator('[data-id="password-input"]')).toHaveAttribute('aria-invalid', 'true');
	});

	test('should allow input in username and password fields', async ({ page }) => {
		// Wait for form to be ready
		await page.waitForSelector('[data-id="username-input"]');
		await page.waitForSelector('[data-id="password-input"]');

		const testEmail = 'daew@carmensoftware.com';
		const testPassword = 'Daew2222';

		// Fill in the fields
		await page.fill('[data-id="username-input"]', testEmail);
		await page.fill('[data-id="password-input"]', testPassword);

		// Verify values
		await expect(page.locator('[data-id="username-input"]')).toHaveValue(testEmail);
		await expect(page.locator('[data-id="password-input"]')).toHaveValue(testPassword);
	});

	test('should navigate to /dashboard on successful login', async ({ page }) => {
		// Wait for form to be ready
		await page.waitForSelector('[data-id="username-input"]');

		// Fill in credentials
		await page.fill('[data-id="username-input"]', 'daew@carmensoftware.com');
		await page.fill('[data-id="password-input"]', 'Daew2222');

		// Wait for navigation with a more generous timeout
		await page.waitForURL('/dashboard', { timeout: 10000 });
		await expect(page).toHaveURL('/dashboard');
	});

	test('should handle successful API sign-in', async ({ request, page }) => {
		// Wait for form to be ready
		await page.waitForSelector('[data-id="username-input"]');

		const testCredentials = {
			email: 'daew@carmensoftware.com',
			password: 'Daew2222',
		};

		// Make direct API call
		const signInResponse = await request.post('/api/auth/signin', {
			data: testCredentials,
		});

		// Verify API response
		expect(signInResponse.ok()).toBeTruthy();
		const responseData = await signInResponse.json();
		expect(responseData).toHaveProperty('success', true);

		// Fill in credentials in UI
		await page.fill('[data-id="username-input"]', testCredentials.email);
		await page.fill('[data-id="password-input"]', testCredentials.password);
		await page.click('[data-id="sign-in-button"]');

		// Verify redirect
		await page.waitForURL('/dashboard', { timeout: 10000 });
		await expect(page).toHaveURL('/dashboard');
	});

	test('should handle failed API sign-in', async ({ request, page }) => {
		const invalidCredentials = {
			email: 'invalid@example.com',
			password: 'wrongpassword',
		};

		// Make direct API call with invalid credentials
		const signInResponse = await request.post('/api/auth/signin', {
			data: invalidCredentials,
		});

		// Verify error response
		expect(signInResponse.ok()).toBeFalsy();
		const responseData = await signInResponse.json();
		expect(responseData).toHaveProperty('success', false);

		// Test UI error handling
		await page.fill('[data-id="username-input"]', invalidCredentials.email);
		await page.fill('[data-id="password-input"]', invalidCredentials.password);
		await page.click('[data-id="sign-in-button"]');

		// Verify error message is displayed
		await expect(page.locator('[data-id="sign-in-error"]')).toBeVisible();
		await expect(page).toHaveURL('/sign-in');
	});

	test('should handle API network errors', async ({ request, page }) => {
		// Mock a network error response
		await page.route('/api/auth/signin', (route) =>
			route.fulfill({
				status: 500,
				body: JSON.stringify({ message: 'Internal server error' }),
			})
		);

		// Attempt sign in
		await page.fill('[data-id="username-input"]', 'test@example.com');
		await page.fill('[data-id="password-input"]', 'password123');
		await page.click('[data-id="sign-in-button"]');

		// Verify error handling
		await expect(page.locator('[data-id="sign-in-error"]')).toBeVisible();
		await expect(page).toHaveURL('/sign-in');
	});
});
