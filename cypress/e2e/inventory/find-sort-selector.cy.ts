/// <reference types="cypress" />

describe('Find product sort dropdown selector', () => {
    before(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory.html');
    });

    it('should log all select elements on inventory page', () => {
        cy.get('select').each(($el, index) => {
            cy.log(`Select[${index}]:`, $el.attr('id'), $el.attr('class'), $el.attr('data-test'));
        });
    });
});
