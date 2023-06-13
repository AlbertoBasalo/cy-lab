/**
 * The Home page
 *   when page is loading data
 *     should show a loading message
 *     should not show an error dialog
 *     should not show data
 *   when there is an error
 *     should show an error dialog
 *     should not show a loading message
 *     should not show data
 *   when no data arrives
 *     should show a no data message
 *     should not show a loading message
 *     should not show an error dialog
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
    beforeEach(() => {
      cy.intercept("GET", API_URL, {
        delay: 1000,
      });
    });
    it("should show a loading message", () => {
      cy.get("aside[aria-busy='true']").should("exist");
    });
    it("should not show an error dialog", () => {
      cy.get("#error-dialog").should("not.exist");
    });
    it("should not show data", () => {
      cy.get("article[name='Activity list']").should("not.exist");
    });
  });
  context("when there is an error", () => {
    beforeEach(() => {
      cy.intercept("GET", API_URL, {
        statusCode: 400,
      });
    });
    it("should show an error dialog", () => {
      cy.get("#error-dialog").should("be.visible");
    });
    it("should not show a loading message", () => {
      cy.get("aside[aria-busy='true']").should("not.exist");
    });
    it("should not show data", () => {
      cy.get("article").should("not.exist");
    });
    afterEach(() => {
      cy.get(".close").click();
    });
  });
  context("when no data arrives", () => {
    beforeEach(() => {
      cy.intercept("GET", API_URL, {
        body: [],
      });
    });
    it("should show a no data message", () => {
      cy.get("article[name='Published activities']").should("contain.text", "No data yet!");
    });
    it("should not show an error dialog", () => {
      cy.get("#error-dialog").should("not.exist");
    });
    it("should not show a loading message", () => {
      cy.get("aside[aria-busy='true']").should("not.exist");
    });
  });
  context("when data arrives", () => {
    beforeEach(() => {
      cy.intercept("GET", API_URL, {
        fixture: "activities",
      });
    });
    it("should have main list content", () => {
      cy.get("main[name='list-content']").should("exist");
    });
    it("should not show an error dialog", () => {
      cy.get("#error-dialog").should("not.exist");
    });
    it("should not show a loading message", () => {
      cy.get("aside[aria-busy='true']").should("not.exist");
    });
  });
});
