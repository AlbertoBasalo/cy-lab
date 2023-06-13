/**
 * Given an already registered and logged user
 *  when visits the home page
 *   should display user menu
 *   should send the token to the server
 */
describe("Given an already registered and logged user", () => {
  const PAGE_URL = "http://localhost:4200/";
  const API_URL = `${Cypress.env("apiUrl")}/activities?state=published`;
  beforeEach(() => {
    cy.fixture("token.json").then((token) => {
      localStorage.setItem("user-access-token", JSON.stringify(token));
      cy.intercept("GET", API_URL).as("getActivities");
    });
  });
  context("when visits the home page", () => {
    beforeEach(() => {
      cy.visit(PAGE_URL);
    });
    it("should display user menu", () => {
      cy.get("#user-menu").should("be.visible");
    });
    it("should send the token to the server", () => {
      cy.wait("@getActivities").then((interception) => {
        const token = interception.request.headers.authorization;
        expect(token).to.contain("Bearer");
      });
    });
  });
});

/**
 * Given a secured endpoint returning 401
 *  when the user visits a page calling it
 *   should be redirected to the register page
 */
describe("Given a secured endpoint returning 401", () => {
  const REGISTER_URL = "http://localhost:4200/auth/sign-up";
  const PAGE_URL = "http://localhost:4200/activities/mines";
  const API_URL = `${Cypress.env("apiUrl")}/activities/?userId=`;
  beforeEach(() => {
    cy.intercept("GET", API_URL, {
      statusCode: 401,
      body: "Unauthorized",
    }).as("getSecuredApi");
  });
  context("when the user visits a page calling it", () => {
    beforeEach(() => {
      cy.visit(PAGE_URL);
    });
    it("should be redirected to the register page", () => {
      cy.wait("@getSecuredApi");
      cy.url().should("equal", REGISTER_URL);
    });
  });
});
