# Cypress Test Suite for SauceDemo

This repository contains Cypress end-to-end tests for the SauceDemo website.

## Folder Structure

```
cypress/
  e2e/
    saucedemo/
      login.cy.ts         # Login page tests
    inventory/
      inventory.cy.ts     # Inventory page tests
```

## Test Coverage

### Login Tests (`saucedemo/login.cy.ts`)
- Verifies login form visibility
- Tests login with invalid credentials
- Tests login with valid credentials

### Inventory Tests (`inventory/inventory.cy.ts`)
- Displays all products
- Adds all products to the cart
- Removes a product from the cart
- Views product details
- Sorts products by price (low to high, high to low)
- Sorts products by name (A to Z, Z to A)
- Navigates to the cart page
- Logs out from the inventory page

## How to Run Tests

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run all tests:
   ```bash
   npx cypress run
   ```
3. Run a specific test file:
   ```bash
   npx cypress run --spec cypress/e2e/saucedemo/login.cy.ts
   npx cypress run --spec cypress/e2e/inventory/inventory.cy.ts
   ```

## Notes
- The tests use robust selectors and include waits for sorting actions.
- Make sure you have internet access to reach https://www.saucedemo.com/.
- For interactive debugging, use:
  ```bash
  npx cypress open
  ```

## Contact
For questions or issues, please contact the test author or open an issue in your repository.
