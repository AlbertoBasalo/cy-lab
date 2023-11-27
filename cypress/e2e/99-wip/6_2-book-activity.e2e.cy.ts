/**
 * Given I am a valid logged-in user visiting the first published activity page
 *  When I click on the "Book" button
 *   Then I should see a confirmation message
 */

describe("Given I am a valid logged-in user visiting the first published activity page", () => {
  const PAGE_URL = "http://localhost:4200/";

  beforeEach(() => {
    // Arrange
    cy.login();
    cy.visit(PAGE_URL);
    cy.get(`[name='list-content'] a`).first().click();
  });
  context("When I click on the 'Book' button", () => {
    beforeEach(() => {
      // Act
      cy.get(`#book-activity`).click();
    });
    it("Then I should see a confirmation message", () => {
      // Assert
      cy.get("#booked-activity-dialog").should("contain", "Activity Booked");
    });
  });
});
