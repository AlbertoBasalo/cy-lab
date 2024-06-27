export class HomePage {
  visit() {
    cy.visit('');
  }

  getSearchInput() {
    return cy.get('lab-search > input')
  }

  getActivitiesList() {
    return cy.get('#activities-list')
  }

  getActivitiesAnchorList() {
    return this.getActivitiesList().find('a')
  }
}