// automate with cy commands and npm scripts
// "test:auth": "cypress run --spec '**/2_*.cy.ts'",

/**
 * Given an already registered and logged user
 *  When clicks on new activity
 *   Then should display the new activity form
 */
describe("Given an already registered and logged user", () => {
  beforeEach(() => {
    cy.loginUI();
  });
  context("When clicks on new activity", () => {
    const activityUrl = "/activity";
    beforeEach(() => {
      cy.get(`a[href="${activityUrl}"]`).click(); // click on the user menu
    });
    it("Then should display the new activity form", () => {
      cy.get("form").should("be.visible"); // assert the activity form is visible
    });
  });
});


