/**
 * The Activity Bookings home page
 *   should be visitable
 *   should have a banner
 *   should have an app-title class with 'Activity Bookings' text
 *   should contain '©' in the footer
 *   should have a link to albertobasalo.dev
 *   should have an underline element with 'Course sample' content
 *   should have a link with css class 'secondary'
 */
describe("The Activity Bookings home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });
  it("should be visitable", () => {
    cy.get("html").should("exist");
  });
  it("should have a banner", () => {
    cy.get("[role=banner]").should("exist");
  });
  it("should have an app-title class with 'Activity Bookings' text", () => {
    cy.get(".app-title").should("contain.text", "Activity Bookings");
  });
  it("should contain '©' in the footer", () => {
    cy.get("footer").contains("©");
  });
  it("should have a link to albertobasalo.dev", () => {
    cy.get('[href="https://albertobasalo.dev"]').should("exist");
  });
  it("should have an underline element with 'Course sample' content", () => {
    cy.get("u").contains("Course sample");
  });
  it("should have a link with css class 'secondary'", () => {
    cy.get("a.secondary").should("exist");
  });
});
