export function typeBlur(selector: string, value: unknown) {
  cy.get(selector).clear().type(value as string).blur()
}
export function loginUICredentials(email: string, password: string) {
  const loginUrl = "/auth/login";
  const loginApiUrl = `${Cypress.env("apiUrl")}/login`;
  cy.intercept("POST", loginApiUrl).as("postLogin");
  cy.visit(loginUrl);
  cy.get("form").type('{enter}');
  typeBlur("#email", email);
  typeBlur("#password", password);
  cy.get("button").click();
  cy.wait('@postLogin')
}
export function loginUI() {
  const credentials: any = Cypress.env("testUser")
  loginUICredentials(credentials.email, credentials.password)
}

