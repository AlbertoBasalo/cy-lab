// gwt scenarios with beforeEach hooks

/**
 * Given a logged in user
 *  When visiting the profile page
 *    Then should see its own activities
 */
describe("Given a logged in user", () => {
  beforeEach(() => {
    cy.loginUI();
  });
  context("When visiting the profile page", () => {
    beforeEach(() => {
      cy.visit("/auth/profile");
    });
    it("Then should see its own activities", () => {
      cy.get("article.activity").should("have.length", 3);
    });
  });
});
