/**
 * The Home page
 *   when page is loading data
 *     should show a loading message
 *     should not show an error message
 *     should not show data
 *   when data arrives
 *     should have main list content
 *     should not show an error dialog
 *     should not show a loading message
 */

describe("The Home page", () => {
  const API_URL = `${Cypress.env("apiUrl")}/activities*`;
  beforeEach(() => {
    cy.visit("/");
  });
  context("when page is loading data", () => {
    it("should show a loading message", () => {
      cy.get("aside p[aria-busy='true']").should("exist");
    });
    it("should not show an error dialog", () => {
      cy.get("aside[name='error']").should("not.exist");
    });
    it("should not show data", () => {
      cy.get("ul[name='activities-list']").should("not.exist");
    });
  });
  context("when data arrives", () => {
    beforeEach(() => {
      // wait for the data to arrive
      cy.wait(2000);
    });
    it("should have main list content", () => {
      cy.get("ul[name='activities-list']").should("exist");
    });
    it("should not show an error dialog", () => {
      cy.get("aside[name='error']").should("not.exist");
    });
    it("should not show a loading message", () => {
      cy.get("aside p[aria-busy='true']").should("not.exist");
    });
  });
});
