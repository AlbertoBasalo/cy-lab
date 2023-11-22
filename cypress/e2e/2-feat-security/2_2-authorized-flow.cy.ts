// cy commands

/**
 * Given an already registered and logged user
 *  when visits the app
 *   should display user menu
 *  when clicks on the user menu
 *   should display the user profile
 */
describe("Given an already registered and logged user", () => {
  beforeEach(() => {
    cy.loginUI();
  });
  context("when visits the app", () => {
    const profileUrl = "/auth/profile";
    it("should display user menu", () => {
      cy.get(`a[href="${profileUrl}"]`) // wait for the user menu
        .should("be.visible"); // assert it is visible
    });
  });
  context("when clicks on the user menu", () => {
    const profileUrl = "/auth/profile";
    beforeEach(() => {
      cy.get(`a[href="${profileUrl}"]`).click(); // click on the user menu
    });
    it("should display the user profile with his 3 activities", () => {
      const userActivities = 3;
      cy.url() // wait for the redirection
        .should("equal", Cypress.config("baseUrl") + profileUrl); // compare with the expected url
      cy.get("article.activity") // wait for the user activities
        .should("have.length", userActivities); // assert the number of activities
    });
  });
});
