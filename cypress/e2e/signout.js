// Import the Faker library to generate random test data
import { faker } from '@faker-js/faker';

describe('Create Account Flow', () => {
  before(() => {
    Cypress.on('uncaught:exception', (_err, _runnable) => {
      return false;
    });
  });

  it('visits sign in page and submits a valid data', () => {

    // Visit the login page URL
    // auth: provides basic authentication credentials if required
    cy.visit('https://cyclebar.xpodev.com/auth/login', {
      auth: {
        username: 'admin',
        password: 'testify'
      }
    });

    // Generate test data
    const email = 'kwachie+369@foxholeqa.com';
    const password = 'Delmonte2';

    // Fill in the email input field
    cy.get('#form-input-email').type(email);

    // Fill in the password input field
    cy.get('#form-input-password').type(password);

    // Click the Sign In button
    cy.get('.btn.btn-primary[type="submit"]').click();


    //Logout account
    cy.wait(5000);
    cy.get('.pr-2').click();

  });
});
