// use config variables
// Check for what happens after real login success and failure

/**
 * Given a user at login flow
 *  When sends valid credentials
 *    Then should hide login menu
 *  When sends invalid credentials
 *    Then should still display anonymous menu
 */
describe("Given a user at login flow", () => {
  const loginUrl = "/auth/login";
  const loginApiUrl = `${Cypress.env("apiUrl")}/login`;
  beforeEach(() => {
    // intercept just to wait for the request to finish
    cy.intercept("POST", loginApiUrl).as("postLogin");
    cy.visit(loginUrl);
    cy.get(`a[href="${loginUrl}"]`).as("loginMenu");
  });
  context("when sends valid credentials", () => {
    beforeEach(() => {
      // get the credentials from the config
      const credentials: any = Cypress.env("testUser")
      cy.get("form").type('{enter}');
      cy.get("#email").type(credentials.email);
      cy.get("#password").type(credentials.password);
      cy.get("button").click();
      cy.wait("@postLogin"); // wait for the request to finish
    });
    it.only("Then should hide login menu", () => {
      cy.get('@loginMenu') // the login menu
        .should("not.exist"); // assert not exist
    });
  });

  context("When sends invalid credentials", () => {
    beforeEach(() => {
      cy.get("#email").clear().type("wrong@email.dev");
      cy.get("#password").clear().type("wrong_password");
      cy.get("button").click();
      cy.wait("@postLogin"); // wait for the request to finish
    });
    it("Then should still display anonymous menu", () => {
      cy.get('@loginMenu')  // the login menu still exists
    });
  });
});
