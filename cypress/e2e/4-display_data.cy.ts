// Given When Then

/**
 * Given The Activities page with data
 *  When no API server is available
 *   Then should not display a busy message
 *    Nor an activities-list
 *    And should display an error message
 */

describe('Given The Activities page', () => {
  beforeEach(() => {
    cy.visit('');
  });
  context('When no API server is available', () => {
    it('Then should not display a busy message Nor an activities-list And should display an error message', () => {
      cy.get('[aria-busy="true"]').should('not.exist');
      cy.get('#activities-list').should('not.exist');
      cy.get('[aria-invalid="true"]').should('exist');
    });
  });
});
