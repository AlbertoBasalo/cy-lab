import { beforeEach } from 'mocha';
import { HomePage } from '../../support/pages/home.page';

/**
 * Given I am visiting the home page
 *  When data arrives
 *    Then I should see a list of activities
 */
describe('', () => {
  const homePage = new HomePage();
  beforeEach(() => {
    const url = `${Cypress.env('apiUrl')}/activities*`;
    const response = {
      fixture: 'activities',
    };
    cy.intercept(url, response).as('getActivities');
    homePage.visit();
  });
  context('When data arrives"', () => {
    beforeEach(() => {
      cy.wait('@getActivities');
    });
    it('Then I should see a list of activities ', () => {
      homePage.getActivitiesAnchorList().should('have.length', 17);
    });
  });
});
