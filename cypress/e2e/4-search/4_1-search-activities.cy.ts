/**
 * Given I am visiting the home page
 *  When I search for "diving"
 *    Then I should see a list of activities containing "diving" in their title
 */

import { HomePage } from '../../support/pages/home.page';

describe('', () => {
  const homePage = new HomePage();
  const searchTerm = 'diving';
  beforeEach(() => {
    const url = `${Cypress.env('apiUrl')}/activities*`;
    cy.intercept(url).as('getActivities');
    homePage.visit();
  });
  context('When I search for "diving"', () => {
    beforeEach(() => {
      homePage.getSearchInput().clear().type(searchTerm);
    });
    it('Then I should see a list of activities containing "diving" in their title', () => {
      homePage.getActivitiesAnchorList().each(($jqItem: JQuery<HTMLElement>) => {
        cy.wrap($jqItem).should('contain.text', searchTerm);
      });
    });
  });
});
