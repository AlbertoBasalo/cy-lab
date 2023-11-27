/**
 * An object containing all the selectors for the activities page
 */
export class ActivitiesPage {
  /** Visits the page */
  visit(): void {
    cy.visit("/activities");
  }
  /** Gets the search input control */
  getSearchInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("#search");
  }
  /** Gets the list items for the activities */
  getActivitiesListItems(): Cypress.Chainable<JQuery<HTMLLIElement>> {
    return cy.get("#activities-list").find("li");
  }
}
