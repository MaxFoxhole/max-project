// Import the Faker library to generate random test data
import { faker } from '@faker-js/faker';

// Describe block defines a test suite for "Create Account Flow"
describe('Create Account Flow', () => {

  // Runs once before all tests in the suite
  before(() => {
    // Handle any uncaught JavaScript exceptions on the page
    Cypress.on('uncaught:exception', (_err, _runnable) => {
      // Returning false prevents Cypress from failing the test due to JS errors
      return false;
    });
  });

  // Define a test case
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
    // Here email and password are hardcoded, but faker could be used to create dynamic values
    const email = 'kwachie+369@foxholeqa.com';
    const password = 'Delmonte1';

    // Fill in the email and password input field
    cy.get('#form-input-email').type(email);
    cy.get('#form-input-password').type(password);

    // Check the checkbox (e.g., Terms & Conditions or Remember Me)
    cy.get('input[type="checkbox"]').check(); //optional


    // Click the Sign In button
    // Selects a button with class 'btn btn-primary' and type 'submit'
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

      // Generate test data
      // Here email and password are hardcoded, but faker could be used to create dynamic values
      const email = 'kwachie+369@foxholeq';
      const password = 'Delm';

      // Fill in the email input field
      cy.get('#form-input-email').type(email);
       
      // Fill in the password input field
      cy.get('#form-input-password').type(password);
      

      // Check the checkbox (e.g., Terms & Conditions or Remember Me)
      // cy.get('input[type="checkbox"]').check();


      // Click the Sign In button
      // Selects a button with class 'btn btn-primary' and type 'submit'
      cy.get('.btn.btn-primary[type="submit"]').click();


      //check validation
      cy.contains('Email Address must be a valid email').should('be.visible');
      cy.contains('Password must be at least 6 characters').should('be.visible');

    });
});
