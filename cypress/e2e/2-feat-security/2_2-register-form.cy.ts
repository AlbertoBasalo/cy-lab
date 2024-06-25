// intercept with correct strategy

/**
 * Given a user at register form
 *  When types invalid credentials
 *    Then should have disabled submit button
 *  When types valid credentials
 *    Then should send the form data to the server 
 */

describe("Given a user at login flow", () => {
  const registerUrl = 'http://localhost:3000/api/register'
  const credentials = {
    username: "Test User",
    email: "test@valid.org",
    password: "1validPassword!",
    terms: true,
  }

  beforeEach(() => {
    cy.visit('/auth/register')
    cy.get("form button[type=submit]").as('submitCredentials')
  })
  context("When types invalid credentials", () => {
    beforeEach(() => {
      cy.get("#username").type(credentials.username);
      cy.get("#email").type(credentials.email);
      cy.get("#password").type(credentials.password);
      cy.get("#confirm").type(credentials.password + 'distinct');
    });
    it("Then should get a 400 response and still display anonymous menu", () => {
      cy.get('@submitCredentials').should('be.disabled')
    });
  });
  context("When types valid credentials", () => {
    beforeEach(() => {
      // simulate a successful register without the need of a server
      const fakeResponse = {
        statusCode: 201
      }
      cy.intercept('POST', registerUrl, fakeResponse).as('postRegister')
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
        .should('deep.equal', credentials)
    });
  });
})