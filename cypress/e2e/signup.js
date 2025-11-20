import { faker } from '@faker-js/faker';

describe('Create Account Flow', () => {
  before(() => {
    // If the page might throw JS exceptions, ignore them
    Cypress.on('uncaught:exception', (_err, _runnable) => {
      // returning false prevents Cypress from failing the test
      return false;
    });
  });

  it('visits signup page and submits a valid data', () => {
    // Visit the signup URL
    cy.visit('https://cyclebar.xpodev.com/auth/register', {
      auth: {
        username: 'admin',
        password: 'testify'
      }
    });

    // Generate random data
    const randNum = Cypress._.random(1, 999);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `kwachie+${randNum}@foxholeqa.com`;
    const phone = faker.phone.number();
    const password = faker.internet.password();

    // Generate Birthday
    const year = Math.floor(Math.random() * 30) + 1970; // 1970-1999
    const month = Math.floor(Math.random() * 12) + 1;   // 1-12
    const day = Math.floor(Math.random() * 28) + 1;     // 1-28



    // Fill out the form fields
    cy.get('#form-input-firstName').should('be.visible').type(firstName);
    cy.get('#form-input-lastName').should('be.visible').type(lastName);
    cy.get('#form-input-email').type(email);
    cy.get('#form-input-phoneMain').type(phone);
    cy.get('#form-input-password').type(password);
    cy.get('#form-input-passwordConfirmation').type(password);
    cy.get('#form-input-passwordConfirmation').type(password);
    cy.get('[name=birthDate_month]').select(month);
    cy.get('[name=birthDate_day]').select(day);
    cy.get('[name=birthDate_year]').select(year.toString());


    //checkbox
    cy.get('input[type="checkbox"]').check();
  });

  

  it('visits signup page and submits invalid data', () => {
    // Visit the signup URL
    cy.visit('https://cyclebar.xpodev.com/auth/register', {
      failOnStatusCode: false,
      auth: {
        username: 'admin',
        password: 'testify'
      }
    });

    // Intentionally invalid data
    const firstName = '123';            // invalid: numbers in name
    const lastName = '321';                 // invalid: empty last name
    const email = 'invalid-email';       // invalid email
    const phone = 'abcd';                // invalid phone
    const password = '123';              // weak/short password

    // Fill out the form fields with invalid data
    cy.get('#form-input-firstName').should('be.visible').type(firstName);
    cy.get('#form-input-lastName').type(lastName);
    cy.get('#form-input-email').type(email);
    cy.get('#form-input-phoneMain').type(phone);
    cy.get('#form-input-password').type(password);
    cy.get('#form-input-passwordConfirmation').type(password);


    // Check checkboxes if required
    cy.get('input[type="checkbox"]').check();

    // Click submit button
    cy.get('.btn-primary[type="submit"]').click();

    // Assertions: check validation messages
    cy.contains('Enter a valid name').should('be.visible');
    cy.contains('Enter a valid name').should('be.visible');
    cy.contains('Email Address must be a valid email').should('be.visible');
    cy.contains('Enter a valid phone number').should('be.visible');
    cy.contains('Password must be at least 6 characters').should('be.visible');
    cy.contains('Please enter a valid date').should('be.visible');
  });
});
