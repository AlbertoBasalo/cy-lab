/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

export const TOKEN_KEY = "lab_user-token";

Cypress.Commands.add("loginUI", () => {
  const loginUrl = "/auth/login";
  cy.visit(loginUrl);
  const loginApiUrl = `${Cypress.env("apiUrl")}/login`;
  cy.intercept("POST", loginApiUrl).as("postLogin");
  const credentials: any = {
    email: "test@valid.org",
    password: "1validPassword!",
  };
  cy.get("form").type("{enter}");
  cy.get("#email").type(credentials.email)
  cy.get("#password").type(credentials.password)
  cy.get("button[type=submit]").click();
  cy.wait("@postLogin");
});

Cypress.Commands.add("login", () => {
  cy.fixture("user-token.json").then((userToken) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(userToken));
  });
});

Cypress.Commands.add("logout", () => {
  cy.window().its("localStorage").invoke("removeItem", TOKEN_KEY);
});

Cypress.Commands.add("registerFlow", () => {
  const AUTH_URL = "/auth/sign-up";
  const API_AUTH_URL = `${Cypress.env("apiUrl")}/register`;
  cy.fixture("new-user").then((NEW_USER) => {
    cy.intercept("POST", API_AUTH_URL, {
      statusCode: 201,
      fixture: "token",
    }).as("postRegister");
    cy.visit(AUTH_URL);
    cy.registerUI(NEW_USER.username, NEW_USER.email, NEW_USER.password);
  });
});

Cypress.Commands.add("registerUI", (username, email, password) => {
  cy.get("#username").clear().type(username);
  cy.get("[type='email']").clear().type(email);
  cy.get("[type='password']").first().clear().type(password);
  cy.get("[name='repeatPassword']").clear().type(password);
  cy.get("form button[type=submit]").click();
});

Cypress.Commands.add("force401", () => {
  cy.intercept("GET", `${Cypress.env("apiUrl")}/**`, { statusCode: 401 }).as("get401");
});

Cypress.Commands.add("interceptPublishedActivities", () => {
  const API_URL = `${Cypress.env("apiUrl")}/activities?state=published`;
  cy.fixture("activities").then((activitiesElement) => {
    const activities = activitiesElement as unknown as any[];
    const publishedActivities = activities.filter(
      (activity: any) => activity.state === "published"
    );
    cy.intercept("GET", API_URL, {
      body: publishedActivities,
    }).as("getPublishedActivities");
  });
});

Cypress.Commands.add("interceptFirstActivity", () => {
  const API_URL = `${Cypress.env("apiUrl")}/activities?slug=`;
  cy.fixture("activities").then((activitiesElement) => {
    const activities = activitiesElement as unknown as any[];
    const publishedActivities = activities.filter(
      (activity: any) => activity.state === "published"
    );
    const firstActivity = publishedActivities[0];
    cy.intercept("GET", `${API_URL}${firstActivity.slug}`, {
      body: [firstActivity],
    }).as("getFirstActivity");
  });
});

Cypress.Commands.add("interceptPostBooking", () => {
  const API_URL = `${Cypress.env("apiUrl")}/bookings/**`;
  cy.intercept("POST", `${API_URL}`, {
    statusCode: 201,
  }).as("postBooking");
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginUI(): Chainable<null>;
      login(): Chainable<null>;
      logout(): Chainable<null>;
      registerFlow(): Chainable<null>;
      registerUI(username: string, email: string, password: string): Chainable<void>;
      interceptPublishedActivities(): Chainable<object>;
      interceptFirstActivity(): Chainable<object>;
      interceptPostBooking(): Chainable<object>;
      force401(): Chainable<void>;
    }
  }
}
