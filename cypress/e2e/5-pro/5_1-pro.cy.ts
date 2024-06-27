describe('Pro 5_1', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('');
  });
  it('should display the user email', () => {
    cy.get('#user');
  });
  it('should still display the user email', () => {
    cy.get('#user');
  });
});
