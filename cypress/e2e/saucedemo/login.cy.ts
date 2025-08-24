/// <reference types="cypress" />

describe('SauceDemo Login', () => {
    const baseUrl: string = 'https://www.saucedemo.com/';

    beforeEach(() => {
        cy.visit(baseUrl);
    });

    it('should display login form', () => {
        cy.get('[data-test="username"]').should('be.visible');
        cy.get('[data-test="password"]').should('be.visible');
        cy.get('[data-test="login-button"]').should('be.visible');
    });

    it('should not login with invalid credentials', () => {
        cy.get('[data-test="username"]').type('invalid_user');
        cy.get('[data-test="password"]').type('invalid_pass');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
    });

    it('should login with valid credentials', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory.html');
        cy.get('.inventory_list').should('be.visible');
    });
});
