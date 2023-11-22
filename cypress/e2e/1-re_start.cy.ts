// Conventions: arrange, act, assert

/**
 * The Activity Bookings home page
 *   should be visible
 *   should have a header
 *   should have a header with 'Activity Bookings' text
 *   should have a link to albertobasalo.dev
 *   should have an underline element with 'Lab sample' content
 *   should have a link with css class 'secondary'
 */

describe("The Activity Bookings home page", () => {
  // before(() => {
  //   cy.visit("http://localhost:4200/");
  // });

  beforeEach(() => {
    cy.visit("http://localhost:4200/"); // Arrange
  });

  it("should be visible", () => {
    cy.get("body").should("be.visible");
  });

  it("should have an header", () => {
    cy.get("header") // Act Assert
  });

  it("should have a header with 'Activity Booking' text", () => {
    cy.get("header") // Act
      .should("contains.text", "Activity Booking"); // Assert
  });

  it("should have a link to https://albertobasalo.dev", () => {
    cy
      .get("a[href='https://albertobasalo.dev']") // Act
      .should("exist"); // Assert
  });

  it("should have an underline element with 'Lab sample' content", () => {
    cy.get("u").contains("Lab sample");
  });

  it("should have a link with css class 'secondary'", () => {
    cy.get("a.secondary");
  });
});
