// alias, get, find, within...

/**
 * Given the Published Activities list
 *   When the data is loaded
 *    Then should display the list counter And the correct number of items
 *    Then should display the name with a link to the activity detail
 *    Then should display activities name, date and price
 */

describe('Given the Published Activities list', () => {
  const expectedActivities = 17;
  const expectedFirstActivity = { name: 'Standup Surfing', slug: 'standup-surfing' };
  beforeEach(() => {
    cy.visit('');
  });
  context('When the data is loaded', () => {
    beforeEach(() => {
      // * Alias to be used in later tests
      cy.get('#activities-list').as('listContent');
    });
    it('Then should display the list counter And the correct number of items', () => {
      cy.get('#activities-count').should('have.text', expectedActivities); // assert with predefined value
      cy.get('@listContent') // reusing the alias with @
        .find('[id^="activity-id-"]') // complex selector
        .should('have.length', expectedActivities);
    });
    // ! Another way to do the same test
    it('Then should display the same counter And number of activities', () => {
      cy.get('#activities-count')
        .invoke('text') // * call a function on the element
        .as('activitiesCount');
      // * Using inner function to get the value of the alias
      cy.get<number>('@activitiesCount').then((activitiesCount) => {
        cy.log('activitiesCount', activitiesCount);
        cy.get('@listContent').find('[id^="activity-id-"]').should('have.length', activitiesCount);
      });
    });
    it('Then should display the name with a link to the activity detail', () => {
      cy.get('@listContent')
        .find('[id^="activity-id-"]')
        .first() // get the first child
        .find('a')
        .should('have.text', expectedFirstActivity.name)
        .invoke('attr', 'href') // get the href attribute 
        .should('contain', expectedFirstActivity.slug); // include the slug
    });
    it('Then should display activities name, date and price', () => {
      cy.get('@listContent')
        .children() // direct descendants
        .first() // the first of the collection
        .as('firstActivityElement'); // save the alias
      cy.get('@firstActivityElement')
        .within(() => { // work inside the element
          cy.get('[itemprop="name"]');
          cy.get('[itemprop="date"]');
          cy.get('[itemprop="price"]');
        });
    });
  });
});
