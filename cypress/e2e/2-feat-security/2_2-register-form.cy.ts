// intercept with correct strategy (form alone - no api)

/**
 * Given a user at register form
 *  When types invalid credentials
 *    Then should have disabled submit button
 *  When types valid credentials
 *    Then should have enable the submit button
 *  When sends valid credentials
 *    Then should send the form data to the server 
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
    cy.visit('/auth/register')
    cy.get("form button[type=submit]").as('submitCredentials')
  })
  context("When types invalid credentials", () => {
    beforeEach(() => {
      cy.get("#username").type(credentials.username);
      cy.get("#email").type('invalid-email');
      cy.get("#password").type(credentials.password);
      cy.get("#confirm").type(credentials.password + 'distinct');
      // no terms checked
    });
    it("Then should have disabled submit button", () => {
      cy.get('@submitCredentials').should('be.disabled')
    });
  });
  context("When types valid credentials", () => {
    beforeEach(() => {
      cy.get("#username").type(credentials.username);
      cy.get("#email").type(credentials.email);
      cy.get("#password").type(credentials.password);
      cy.get("#confirm").type(credentials.password);
      cy.get("#terms").check();
      cy.get('@submitCredentials').click();
    });
    it("Then should have enable the submit button", () => {
      cy.get('@submitCredentials').should('be.enabled')
    });
  });
  context("When sends valid credentials", () => {
    beforeEach(() => {
      // spy the request to check the data sent
      cy.intercept('POST', registerUrl).as('postRegister')
      cy.get("#username").type(credentials.username);
      cy.get("#email").type(credentials.email);
      cy.get("#password").type(credentials.password);
      cy.get("#confirm").type(credentials.password);
      cy.get("#terms").check();
      cy.get('@submitCredentials').click();
    });
    it("Then should send the form data to the server ", () => {
      // check for what you sent to the server
      cy.get("@postRegister")
        .its('request')
        .its('body')
        .should('deep.equal', credentials);
    });
  });
})