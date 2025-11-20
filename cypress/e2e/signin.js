// Import the Faker library to generate random test data
import { faker } from '@faker-js/faker';

//Create Account Flow
describe('Create Account Flow', () => {

  before(() => {
    Cypress.on('uncaught:exception', (_err, _runnable) => {
      // Returning false prevents Cypress from failing the test due to JS errors
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

    // Fill in the email and password input field
    cy.get('#form-input-email').type(email);
    cy.get('#form-input-password').type(password);

    // Check the checkbox (e.g., Terms & Conditions or Remember Me)
    // cy.get('input[type="checkbox"]').check(); //optional


    // Click the Sign In button
    cy.get('.btn.btn-primary[type="submit"]').click();
  });



  it.only('visits sign in page and submits an invalid data', () => {

      // Visit the login page URL
      // auth: provides basic authentication credentials if required
      cy.visit('https://cyclebar.xpodev.com/auth/login', {
        auth: {
          username: 'admin',
          password: 'testify'
        }
      });

      // Incomplete test data
      const email = 'kwachie+369@foxholeq';
      const password = 'Delm';

      // Fill in the email and password input field
      cy.get('#form-input-email').type(email);
      cy.get('#form-input-password').type(password);

      // Click the Sign In button
      cy.get('.btn.btn-primary[type="submit"]').click();

      //check validation
      cy.contains('Email Address must be a valid email').should('be.visible');
      cy.contains('Password must be at least 6 characters').should('be.visible');

    });
});
