// request

/**
 * Given a user with a token
 *  When sends a POST request to create a new activity
 *    Then should return a 201 status code
*/
describe('Given a user with a token', () => {
  let newActivityId: any;
  let userToken: any;

  beforeEach(() => {
    const loginApiUrl = `${Cypress.env("apiUrl")}/login`;
    const credentials: any = Cypress.env("testUser");
    cy.request({
      method: 'POST',
      url: loginApiUrl,
      body: credentials
    }).then((response) => {
      userToken = response.body;
      cy.log(userToken);
      const postActivityApiUrl = `${Cypress.env("apiUrl")}/activities`;
      const headers = {
        Authorization: `Bearer ${userToken.token}`,
      };
      const body = {
        name: 'Surf',
        location: 'Portugal',
        price: 200,
        date: '2024-08-14',
        minParticipants: 4,
        maxParticipants: 8,
      };
      cy.request({
        method: 'POST',
        url: postActivityApiUrl,
        headers,
        body,
      }).as('postActivity');
    });
  });
  it('Then should return a 201 status code', () => {
    cy.get('@postActivity').its('status').should('equal', 201);
    cy.get('@postActivity').its('body').its('id').then((id) => newActivityId = id);
  });
  afterEach(() => {
    const options = {
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/activities/${newActivityId}`,
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };
    cy.request(options).then((response) => {
      cy.log(`Activity ${newActivityId} deleted`, response);
    });
  });
});