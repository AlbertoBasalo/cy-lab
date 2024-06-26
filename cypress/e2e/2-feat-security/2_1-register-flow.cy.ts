// intercept with wrong strategy (too broad and with secondary effects )

/**
 * Given a user at register flow
 *  When types valid credentials
 *    Then should send the form data to the server And displays user menu
 *  When re-types the same credentials
 *    should get a 400 response 
 */

describe("Given a user at login flow", () => {
  const registerUrl = 'http://localhost:3000/api/register'
  const credentials = {
    username: "Test User",
    email: "test@valid.org",
    password: "@validPassword1",
    terms: true,
  }
  beforeEach(() => {
    cy.intercept('POST', registerUrl).as('postRegister')
    cy.visit('/auth/register')
    cy.get("form button[type=submit]").as('submitCredentials')
  })
  context("When types valid credentials", () => {
    beforeEach(() => {
      cy.get("#username").type(credentials.username);
      cy.get("#email").type(credentials.email);
      cy.get("#password").type(credentials.password);
      cy.get("#confirm").type(credentials.password);
      cy.get("#terms").check();
      cy.get('@submitCredentials').click();
    });
    it("Then should send the form data to the server And displays user menu", () => {
      const ACCEPTED_CODE = 201;
      cy.get('@postRegister') // wait for the request
        .its('response.statusCode')// get the response status code
        .should('equal', ACCEPTED_CODE)
    });
  });
  context("When re-types the same credentials", () => {
    beforeEach(() => {
      cy.get("#username").type(credentials.username);
      cy.get("#email").type(credentials.email);
      cy.get("#password").type(credentials.password);
      cy.get("#confirm").type(credentials.password);
      cy.get("#terms").check();
      cy.get('@submitCredentials').click();
    });
    it("Then should get a 400 response and still display anonymous menu", () => {
      cy.get("@postRegister") // wait for the request
        .its('request') // get the request
        .its('body') // get the body
        .should('deep.equal', credentials) // assert the body has the same data
      // ! this test can not be run again without changing the credentials or the server state
      // As a secondary effect, the user could not be registered again
      const INVALID_CODE = 400;
      cy.get("@postRegister")
        .its("response.statusCode")
        .should("equal", INVALID_CODE);
      // ! too broad, is better to test the UI
      cy.get(`a[href="/auth/login"]`)
        .should("be.visible");
    });
  });
})