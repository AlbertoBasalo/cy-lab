/**
 * An object containing all the selectors for the home page
 */
export class HomePage {
  /** Visits the page */
  visit(): void {
    cy.visit("/");
  }
  /** Gets the search input control */
  getSearchInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('lab-search > input')
  }
  /** Gets the list items for the activities */
  getActivitiesListItems(): Cypress.Chainable<JQuery<HTMLAnchorElement>> {
    return cy.get("#activities-list").find("a");
  }
}
