// Given When Then

/**
 * Given The Activities page with data
 *  when data arrives
 *   then should have main list content
 *   then should not show an error message
 *   then should not show a pending message
 */

describe("Given The Activities page", () => {
  beforeEach(() => {
    cy.visit("/activities");
  });
  context("when data arrives", () => {
    it("then should have main list content", () => {
      cy.get("#activities-list");
    });
    it("then should not show an error message", () => {
      cy.get("#error").should("not.exist");
    });
    it("then should not show a pending message", () => {
      cy.get("#pending").should("not.exist");
    });
  });
});
