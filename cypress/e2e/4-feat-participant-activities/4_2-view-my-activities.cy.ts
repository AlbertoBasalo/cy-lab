// intercept responses with fixtures

/**
 * Given I am a valid logged-in user
 *  When visiting my profile page
 *   Then I should see my bookings
 */
describe("Given I am a valid logged-in user", () => {
  const userId = "1";
  const url = `${Cypress.env("apiUrl")}/bookings?userId=${userId}`;
  beforeEach(() => {
    // Arrange
    cy.login();
    cy.intercept("GET", url, { fixture: "bookings" }).as("getBookings");
  });
  context("When visiting my profile page", () => {
    beforeEach(() => {
      // Act
      cy.visit("/auth/profile");
    });
    it("Then I should see my bookings", () => {
      // Assert
      cy.wait("@getBookings").then((interception) => {
        const bodyLength = interception.response?.body.length || 0;
        cy.get("article.booking").should("have.length", bodyLength);
      });
    });
  });
});
