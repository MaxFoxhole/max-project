import { faker } from '@faker-js/faker';

describe('Create Account Flow', () => {

  before(() => {
    Cypress.on('uncaught:exception', (_err, _runnable) => {
      return false;
    });
  });

  // Define a test case
  it.only('visits sign in page and submits a valid data', () => {

    // Visit the login page URL
    cy.visit('https://cyclebar.xpodev.com/auth/login', {
      auth: {
        username: 'admin',
        password: 'testify'
      }
    });

    const email = 'kwachie+369@foxholeqa.com';
    const password = 'Delmonte2';

    cy.get('#form-input-email').type(email);
    cy.get('#form-input-password').type(password);


    // Click the Sign In button
    cy.get('.btn.btn-primary[type="submit"]').click();


    // Update password
    // Hover over to Me and My Account
    cy.contains('a.main-menu__link', 'Me').trigger('mouseover');
    cy.contains('a.main-menu__link', 'My Account').click();
    cy.get('a[href="/account/profile"]').click();


    cy.scrollTo('bottom');

    //Fill out forms to update password
    const CurrentPassword = 'Delmonte1';
    const NewPassword = 'Delmonte2'

    cy.get('#form-input-old_password').type(CurrentPassword);
    cy.get('#form-input-new_password').type(NewPassword);
    cy.get('#form-input-new_password_confirmation').type(NewPassword);
    cy.contains('button', 'Update Password').click();
    cy.wait(3000);
  });


  //input INVALID DATA
 it('visits signup page and submits no data', () => {
    // Visit the sign in URL
    cy.visit('https://cyclebar.xpodev.com/auth/login', {
      auth: {
        username: 'admin',
        password: 'testify'
      }
    });

    const email = 'kwachie+369@foxholeqa.com';
    const password = 'Delmonte2';

    cy.get('#form-input-email').type(email);
    cy.get('#form-input-password').type(password);


    // Click the Sign In button
    cy.get('.btn.btn-primary[type="submit"]').click();


    // Update password
    // Hover over to Me and My Account
    cy.contains('a.main-menu__link', 'Me').trigger('mouseover');
    cy.contains('a.main-menu__link', 'My Account').click();
    cy.get('a[href="/account/profile"]').click();

    cy.scrollTo('bottom');

    //Fill out forms to update password
    const NewPassword = 'Delm'
    const ConfirmNewPassword = 'del'


    cy.get('#form-input-new_password').type(NewPassword);
    cy.get('#form-input-new_password_confirmation').type(ConfirmNewPassword);
    cy.contains('button', 'Update Password').click();
    cy.wait(3000);

    cy.contains('button', 'Update Password').click();

    // Assertions: check validation messages
    cy.contains('Please provide your old password for authentication').should('be.visible');
    cy.contains('Your new password must be at least 6 characters long').should('be.visible');
    cy.contains('Your New Password and Confirmation must match').should('be.visible');
    cy.scrollTo('bottom');
  });


//input NO DATA
 it('visits signup page and submits no data', () => {
    // Visit the sign in URL
    cy.visit('https://cyclebar.xpodev.com/auth/login', {
      auth: {
        username: 'admin',
        password: 'testify'
      }
    });

    const email = 'kwachie+369@foxholeqa.com';
    const password = 'Delmonte2';

    cy.get('#form-input-email').type(email);
    cy.get('#form-input-password').type(password);

    // Click the Sign In button
    cy.get('.btn.btn-primary[type="submit"]').click();

    // Update password
    // Hover over to Me and My Account
    cy.contains('a.main-menu__link', 'Me').trigger('mouseover');
    cy.contains('a.main-menu__link', 'My Account').click();
    cy.get('a[href="/account/profile"]').click();


    cy.scrollTo('bottom');

    cy.contains('button', 'Update Password').click();

    // Assertions: check validation messages
    cy.contains('Please provide your old password for authentication').should('be.visible');
    cy.contains('Please select a new password').should('be.visible');
    cy.contains('Please repeat your new password for confirmation').should('be.visible');
  });
});
