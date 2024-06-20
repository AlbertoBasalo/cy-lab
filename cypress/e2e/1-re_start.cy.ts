// * Configuration, Performance and Conventions: arrange, act, assert

/**
 * The Activity Bookings home page
 *   should be visible
 *   should have a header
 *   should have a header with 'Activity Bookings' text
 *   should have a link to albertobasalo.dev
 *   should have an underline element with 'Lab sample' content
 *   should have a link with css class 'secondary'
 */

describe('The Activity Bookings home page', () => {
  beforeEach(() => {
    // * Use the baseUrl from cypress.config.ts
    cy.visit(''); // Arrange
  });

  it('should be visible', () => {
    cy.get('body') // act
      .should('be.visible'); // Assert
  });

  // ! redundant test
  // it("should have an header", () => {
  //   cy.get("header") // Act Assert
  // });

  it(`should have a header with 'Activity Booking' text`, () => {
    cy.get('header') // Act
      .should('contains.text', 'Activity Booking'); // Assert
  });

  // * Grouped assertions for better performance

  it(`should have a link to https://albertobasalo.dev and an italic element with 'Lab sample' content a link with css class 'secondary`, () => {
    cy.get(`a[href="https://albertobasalo.dev"]`).should('exist');
    cy.get('i').contains('Lab sample');
    cy.get('a.secondary');
  });

  // it("should have an italic element with 'Lab sample' content", () => {
  // });

  // it("should have a link with css class 'secondary'", () => {
  // });
});
