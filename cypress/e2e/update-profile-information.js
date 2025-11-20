import { faker } from '@faker-js/faker';

describe('Create Account Flow', () => {

  before(() => {
    Cypress.on('uncaught:exception', (_err, _runnable) => {
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


    //Fill out forms to update profile information
    const phone = faker.phone.number('+1-###-###-####');
    const street = faker.location.streetAddress();
    const city = faker.location.city();
    const randomState = faker.location.state({ abbreviated: true });
    const zip = faker.location.zipCode();
    const genders = ["Male", "Female", "Not Specified"];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const weightLbs = faker.number.int({ min: 90, max: 330 });
    const size = faker.number.int({ min: 3, max: 16 }); // example range
    const emergencyName = faker.person.fullName();

    cy.get('#form-input-phoneMain').type(phone);
    cy.get('#form-input-address').type(street);
    cy.get('#form-input-city').type(city);
    cy.get('#form-input-state').type(randomState);
    cy.get('#form-input-zip').type(zip);
    cy.get('#form-input-gender').select(gender);
    cy.get('#form-input-weight').type(weightLbs);
    cy.get('#form-input-shoeSize').select(size.toString());
    cy.get('#form-input-emergencyName').type(emergencyName);
    cy.get('#form-input-emergencyPhone').type(phone);


    cy.wait(2000);

    //Save Changes
    cy.contains('button', 'Save Changes').click();

  });
});
