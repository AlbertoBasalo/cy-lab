/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

export const LOCAL_TOKEN = "user-access-token";

// -- This is a parent command --
Cypress.Commands.add("login", () => {
  cy.fixture("token.json").then((token) => {
    localStorage.setItem(LOCAL_TOKEN, JSON.stringify(token));
  });
});

Cypress.Commands.add("logout", () => {
  cy.window().its("localStorage").invoke("removeItem", LOCAL_TOKEN);
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

Cypress.Commands.add("interceptPut", () => {
  const API_URL = `${Cypress.env("apiUrl")}/activities/**`;
  cy.fixture("activities").then((activitiesElement) => {
    const activities = activitiesElement as unknown as any[];
    const publishedActivities = activities.filter(
      (activity: any) => activity.state === "published"
    );
    const firstActivity = publishedActivities[0];
    cy.intercept("PUT", `${API_URL}`, {
      statusCode: 200,
      body: firstActivity,
    }).as("putActivity");
  });
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<null>;
      logout(): Chainable<null>;
      interceptPublishedActivities(): Chainable<object>;
      interceptFirstActivity(): Chainable<object>;
      interceptPut(): Chainable<object>;
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
