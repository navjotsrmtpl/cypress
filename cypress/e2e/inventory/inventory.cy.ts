/// <reference types="cypress" />

describe('SauceDemo Inventory Page', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory.html');
    });

    it('should display all products', () => {
        cy.get('.inventory_item').should('have.length.greaterThan', 0);
    });

    it('should add all products to the cart', () => {
        cy.get('.inventory_item').each(($el) => {
            cy.wrap($el).find('button').contains('Add to cart').click();
        });
        cy.get('.shopping_cart_badge').should('contain', '6');
    });

    it('should remove a product from the cart', () => {
        cy.get('.inventory_item').first().find('button').contains('Add to cart').click();
        cy.get('.shopping_cart_badge').should('contain', '1');
        cy.get('.inventory_item').first().find('button').contains('Remove').click();
        cy.get('.shopping_cart_badge').should('not.exist');
    });

    it('should view product details', () => {
        cy.get('.inventory_item').first().find('.inventory_item_name').click();
        cy.url().should('include', '/inventory-item.html');
        cy.get('.inventory_details_name').should('be.visible');
        cy.go('back');
    });

    it('should sort products by price (low to high)', () => {
        // Use a more generic selector for the sort dropdown
        cy.get('select').first().select('Price (low to high)');
        cy.wait(1000); // Wait for sorting to complete
        cy.get('.inventory_item_price').then(($prices) => {
            const priceValues = Array.from($prices, el => parseFloat(el.textContent!.replace('$', '')));
            const sorted = [...priceValues].sort((a, b) => a - b);
            expect(priceValues).to.deep.equal(sorted);
        });
    });

    it('should sort products by price (high to low)', () => {
        cy.get('select').first().select('Price (high to low)');
        cy.wait(1000);
        cy.get('.inventory_item_price').then(($prices) => {
            const priceValues = Array.from($prices, el => parseFloat(el.textContent!.replace('$', '')));
            const sorted = [...priceValues].sort((a, b) => b - a);
            expect(priceValues).to.deep.equal(sorted);
        });
    });

    it('should sort products by name (A to Z)', () => {
        cy.get('select').first().select('Name (A to Z)');
        cy.wait(1000);
        cy.get('.inventory_item_name').then(($names) => {
            const nameValues = Array.from($names, el => el.textContent!);
            const sorted = [...nameValues].sort();
            expect(nameValues).to.deep.equal(sorted);
        });
    });

    it('should sort products by name (Z to A)', () => {
        cy.get('select').first().select('Name (Z to A)');
        cy.wait(1000);
        cy.get('.inventory_item_name').then(($names) => {
            const nameValues = Array.from($names, el => el.textContent!);
            const sorted = [...nameValues].sort().reverse();
            expect(nameValues).to.deep.equal(sorted);
        });
    });

    it('should navigate to the cart page', () => {
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('.cart_list').should('be.visible');
    });

    it('should logout from inventory page', () => {
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
        cy.url().should('eq', 'https://www.saucedemo.com/');
    });
});
