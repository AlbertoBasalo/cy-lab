// fixtures 
// assert wrap for each

import { HomePage } from "../../support/pages/home.page";

/**
 * Given I am visiting the home page
 *  When I search for "diving"
 *    Then I should see a list of activities containing "diving" in their title
 */
describe("Given I am a valid logged-in user visiting the home page", () => {
  const homePage = new HomePage();
  beforeEach(() => {
    // Arrange
    cy.intercept(`${Cypress.env('apiUrl')}/activities`, { fixture: 'activities' }).as('getActivities');
    homePage.visit();
  });
  context("When I search for 'diving'", () => {
    beforeEach(() => {
      // Act
      homePage.getSearchInput().clear().type("diving");
    });
    it("Then I should see a list of activities containing 'diving' in their title", () => {
      // Assert
      homePage.getActivitiesListItems().each(($jqItem) => {
        cy.wrap($jqItem).should("contain.text", "diving");
      });
    });
  });
});
