// intercept with wrong strategy

/**
 * Given a user at register flow
 *  When types valid credentials
 *    Then should send the form data to the server And displays user menu
 *  when re-types credentials
 *    should get a 400 response 
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
    cy.intercept('POST', registerUrl).as('postRegister')
    cy.visit('/auth/register')
  })
  context("When types valid credentials", () => {
    beforeEach(() => {
      cy.get("#username").type(credentials.username);
      cy.get("#email").type(credentials.email);
      cy.get("#password").type(credentials.password);
      cy.get("#confirm").type(credentials.password);
      cy.get("#terms").check();
      cy.get("form button[type=submit]").as('submitCredentials').should('be.enabled')
      cy.get('@submitCredentials').click();
    });
    it("Then should send the form data to the server And displays user menu", () => {
      cy.get('@postRegister') // wait for the request
        .its('response.statusCode')// get the response status code
        .should('equal', 201)
    });
  });
  context("When types invalid credentials", () => {
    beforeEach(() => {
      cy.get("#username").type(credentials.username);
      cy.get("#email").type(credentials.email);
      cy.get("#password").type(credentials.password);
      cy.get("#confirm").type(credentials.password);
      cy.get("#terms").check();
      cy.get("form button[type=submit]").as('submitCredentials').should('be.enabled')
      cy.get('@submitCredentials').click();
    });
    it("Then should get a 400 response and still display anonymous menu", () => {
      const INVALID_CODE = 400;
      cy.get("@postRegister")
        .its('request')
        .its('body')
        .should('deep.equal', credentials)
      cy.get("@postRegister")
        .its("response.statusCode")
        .should("equal", INVALID_CODE);
      cy.get(`a[href="/auth/login"]`)
        .should("be.visible");
    });
  });
})