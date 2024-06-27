declare namespace Cypress {
  interface Chainable {
    loginUI(): Chainable<null>;
    loginUICredentials(email: string, password: string): Chainable<null>;
    login(): Chainable<null>;
    typeBlur(selector: string, value: unknown): Chainable<null>
  }
}