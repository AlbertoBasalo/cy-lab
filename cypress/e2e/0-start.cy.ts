// Introduction: visit get and should

/**
 * The Activity Bookings home page
 *   should be visitable
 *   should have a header
 *   should have a header with 'Activity Bookings' text
 *   should have a link to albertobasalo.dev
 *   should have an underline element with 'Lab sample' content
 *   should have a link with css class 'secondary'
 */
describe("The Activity Bookings home page", () => {
  it("should be visitable", () => {
    cy.visit("http://localhost:4200/");
  });
  it("should have a header", () => {
    cy.visit("http://localhost:4200/");
    cy.get("header");
  });
  it("should have a header with 'Activity Bookings' text", () => {
    cy.visit("http://localhost:4200/");
    cy.get("header").contains("Activity Bookings");
  });
  it("should have a link to albertobasalo.dev", () => {
    cy.visit("http://localhost:4200/");
    cy.get('[href="https://albertobasalo.dev"]').should("exist");
  });
  it("should have an italic element with 'Lab sample' content", () => {
    cy.visit("http://localhost:4200/");
    cy.get("i").contains("Lab sample");
  });
  it("should have a link with css class 'secondary'", () => {
    cy.visit("http://localhost:4200/");
    cy.get("a.secondary");
  });
});
