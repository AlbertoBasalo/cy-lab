/**
 * The Activity Bookings home page
 *   should be visitable
 *   should have a header
 *   should have a header with 'Activity Bookings' text
 *   should contain '©' in the footer
 *   should have a link to albertobasalo.dev
 *   should have an underline element with 'Course sample' content
 *   should have a link with css class 'secondary'
 */

describe("The Activity Bookings home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });

  it("should be visible", () => {
    cy.get("body").should("be.visible");
  });

  it("should have an header", () => {
    cy.get("header") // Act
      .should("exist"); // Assert
  });

  it("should have a header with 'Activity Booking' text", () => {
    cy.get("header") // Act
      .should("contains.text", "Activity Booking"); // Assert
  });

  it("should contain '©' in the footer' text", () => {
    cy.get("footer") // Act
      .contains("©"); // Assert
  });

  it("should have a link to https://albertobasalo.dev", () => {
    cy.get("a[href='https://albertobasalo.dev']"); // Act Assert
  });

  it("should have an underline element with 'Course sample' content", () => {
    cy.get("u").contains("Course sample");
  });

  it("should have a link with css class 'secondary'", () => {
    cy.get("a.secondary").should("exist");
  });
});
