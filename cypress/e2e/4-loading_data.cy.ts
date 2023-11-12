/**
 * The Home page
 *   when page is loading data
 *     should show a loading message
 *     should not show an error message
 *     should not show data
 *   when data arrives
 *     should have main list content
 *     should not show an error message
 *     should not show a loading message
 */

describe("The Home page", () => {
  const API_URL = `${Cypress.env("apiUrl")}/activities*`;
  beforeEach(() => {
    cy.visit("/");
  });
  context("when page is loading data", () => {
    it("should show a loading message", () => {
      cy.get("#loading").should("exist");
    });
    it("should not show an error message", () => {
      cy.get("#error").should("not.exist");
    });
    it("should not show data", () => {
      cy.get("#activities-list").should("not.exist");
    });
  });
  context("when data arrives", () => {
    const WAIT_TIME = 2000;
    beforeEach(() => {
      // wait for the data to arrive
      cy.wait(WAIT_TIME);
    });
    it("should have main list content", () => {
      cy.get("#activities-list").should("exist");
    });
    it("should not show an error message", () => {
      cy.get("#error").should("not.exist");
    });
    it("should not show a loading message", () => {
      cy.get("#loading").should("not.exist");
    });
  });
});
