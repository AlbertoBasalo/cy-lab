/**
 * Given a user at registration flow
 *  when sends valid new credentials
 *    should send the form data to the server
 *    should store the token in the local storage
 *    should redirect the user to the home page
 *    should display user menu
 *  when sends invalid new credentials
 *    should show an error dialog
 *    should display anonymous menu
 */
describe("Given a user at registration flow", () => {
  const PAGE_URL = "/auth/sign-up";
  const API_URL = `${Cypress.env("apiUrl")}/register`;
  let NEW_USER: any = null;
  before(() => {
    cy.fixture("new-user").then((fixtureContent) => {
      NEW_USER = fixtureContent;
    });
  });
  context("when sends valid new credentials", () => {
    beforeEach(() => {
      cy.visit(PAGE_URL);
      cy.intercept("POST", API_URL, {
        statusCode: 201,
        fixture: "token",
      }).as("register");
      cy.get("#username").clear().type(NEW_USER.username);
      cy.get('[type="email"]').clear().type(NEW_USER.email);
      cy.get('[type="password"]').first().type(NEW_USER.password);
      cy.get('[name="repeatPassword"]').type(NEW_USER.password);
      cy.get("form button[type=submit]").click();
    });
    it("should send the form data to the server", () => {
      cy.wait("@register");
      const expectedPayload = NEW_USER;
      cy.get("@register").its("request.body").should("deep.equal", expectedPayload);
    });
    it("should store the token in the local storage", () => {
      cy.wait("@register");
      const userAccessToken = localStorage.getItem("user-access-token") || "";
      const actualToken = JSON.parse(userAccessToken);
      const expectedToken = {
        accessToken: "xxx.xxx.xxx",
        user: { id: 1, name: NEW_USER.username, email: NEW_USER.email },
      };
      expect(actualToken).to.deep.equal(expectedToken);
    });
    it("should redirect the user to the home page", () => {
      cy.wait("@register");
      cy.url().should("equal", Cypress.config("baseUrl") + "/");
    });
    it("should display user menu", () => {
      cy.wait("@register");
      cy.get("#user-menu").should("be.visible");
    });
  });

  context("when sends invalid new credentials", () => {
    beforeEach(() => {
      cy.visit(PAGE_URL);
      cy.intercept("POST", API_URL, {
        statusCode: 400,
        body: "Invalid credentials",
      }).as("register");
      cy.get("#username").clear().type(NEW_USER.username);
      cy.get('[type="email"]').clear().type(NEW_USER.email);
      cy.get('[type="password"]').first().type(NEW_USER.password);
      cy.get('[name="repeatPassword"]').type(NEW_USER.password);
      cy.get("form button[type=submit]").click();
    });
    it("should show the error dialog", () => {
      cy.wait("@register");
      cy.get("#error-dialog").should("be.visible");
    });
    it("should display anonymous menu", () => {
      cy.wait("@register");
      cy.get("#anonymous-menu").should("be.visible");
    });
  });
});
