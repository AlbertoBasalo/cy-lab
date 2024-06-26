// Use page objects, commands and utils

import { API_ACCEPTED } from '../../support/api.utils';
import { NewActivityPage } from '../../support/pages/new-activity.page';

/**
 * Given a logged in user visiting the new activity page
 *  When fills the form with valid data
 *    Then should sent the form data to the server
 */
describe('Given a logged in user visiting the new activity page', () => {
  const newActivityPage: NewActivityPage = new NewActivityPage();
  beforeEach(() => {
    // intercept the POST request to create a new activity without actually creating it
    cy.intercept('POST', `${Cypress.env('apiUrl')}/activities`, API_ACCEPTED).as('postActivity');
    newActivityPage.visit();
  });
  context('When fills the form with valid data', () => {
    const newActivity = {
      name: 'Surf',
      location: 'Portugal',
      price: 200,
      date: '2024-08-14',
      minParticipants: 4,
      maxParticipants: 8,
    };
    beforeEach(() => {
      cy.get('form');
      // preferred way to fill the form
      newActivityPage.typeName(newActivity.name);
      newActivityPage.typeLocation(newActivity.location);
      // alternative way to fill the form
      cy.typeBlur('#price', newActivity.price);
      cy.typeBlur('#date', newActivity.date);
      cy.typeBlur('#minParticipants', newActivity.minParticipants);
      cy.typeBlur('#maxParticipants', newActivity.maxParticipants);
      newActivityPage.submit();
    });
    it('Then should sent the form data to the server', () => {
      // ! fails bc of id userId and slug
      cy.get('@postActivity').its('request').its('body').should('not.deep.equal', newActivity);
      // alternative way to check the request body
      cy.get('@postActivity')
        .its('request')
        .its('body')
        .then((body) => {
          // check all properties except id userId and slug
          const { id, userId, slug, ...expectedBody } = body;
          expect(expectedBody).to.deep.equal(newActivity);
        });
    });
  });
});
