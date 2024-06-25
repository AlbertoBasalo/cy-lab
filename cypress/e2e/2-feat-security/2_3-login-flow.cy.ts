// config variables

/**
 * Given a user at login flow
 *  When types valid credentials
 *    Then should hide login menu
 *  When types invalid credentials
 *    Then should still display anonymous menu
 */
describe("Given a user at login flow", () => {
  const loginUrl = "/auth/login";
  const loginApiUrl = `${Cypress.env("apiUrl")}/login`;
  beforeEach(() => {
    cy.intercept("POST", loginApiUrl).as("postLogin");
    cy.visit(loginUrl);
  });
  context("when types valid credentials", () => {
    beforeEach(() => {
      const credentials: any = {
        email: "test@valid.org",
        password: "1234",
      };
      cy.get("form").type('{enter}');
      cy.get("#email").type(credentials.email);
      cy.get("#password").type(credentials.password);
      cy.get("form button[type=submit]").click();
      cy.wait("@postLogin"); // wait for the request to finish
    });
    it.only("Then should hide login menu", () => {
      cy.get(`a[href="${loginUrl}"]`) // the login menu
        .should("not.exist"); // assert not exist
    });
  });

  context("When types invalid credentials", () => {
    const INVALID_CODE = 404;
    beforeEach(() => {
      cy.intercept("POST", loginApiUrl, { statusCode: INVALID_CODE }).as("postLogin");
      cy.get("#email").clear().type("wrong@email.dev");
      cy.get("#password").clear().type("wrong_password");
      cy.get("form button[type=submit]").should("be.enabled").click();
    });
    it("Then should still display anonymous menu", () => {
      cy.get(`a[href="${loginUrl}"]`) // the login menu
        .should("be.visible"); // assert it is visible
    });
  });
});
