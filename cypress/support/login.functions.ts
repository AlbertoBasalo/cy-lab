export function loginUICredentials(email: string, password: string) {
  const loginUrl = '/auth/login';
  const loginApiUrl = `${Cypress.env('apiUrl')}/login`;
  cy.intercept('POST', loginApiUrl).as('postLogin');
  cy.visit(loginUrl);
  cy.get('form').type('{enter}');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('button').click();
  cy.wait('@postLogin');
}
export function loginUI() {
  const credentials: any = Cypress.env('testUser');
  loginUICredentials(credentials.email, credentials.password);
}

export function login() {
  const loginFunction = () => {
    const apiUrl = Cypress.env('apiUrl');
    const url = `${apiUrl}/login`;
    const body: any = Cypress.env('testUser');
    cy.request({ method: 'POST', url, body })
      .its('body')
      .then((userAccessToken) => {
        cy.log('userAccessToken', userAccessToken);
        window.localStorage.setItem('userAccessToken', JSON.stringify(userAccessToken));
      });
  };
  const validateFunction = () => {
    cy.window()
      .its('localStorage.userAccessToken')
      .should('exist');
  }

  const sessionOptions = {
    cacheAcrossSpecs: true, validate: validateFunction
  };
  cy.session('login', loginFunction, sessionOptions);
}
