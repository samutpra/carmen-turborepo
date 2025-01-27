describe('template spec', () => {
	/* ==== Test Created with Cypress Studio ==== */
	it('sign-in-cy-test', function () {
		/* ==== Generated with Cypress Studio ==== */
		cy.visit('http://localhost:3500');
		cy.get('[data-cy="sign-in-link"]').click();
		cy.get('[data-cy="username-input"]').type('daew@carmensoftware.com');
		cy.get('[data-cy="password-input"]').type('Daew2222{enter}');
		cy.get('[data-cy="sign-in-button"]').click();
		/* ==== End Cypress Studio ==== */
	});
});
