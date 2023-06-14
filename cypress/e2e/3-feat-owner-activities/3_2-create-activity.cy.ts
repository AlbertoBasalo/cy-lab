/**
 * Given a registered user
 *  When click on the create activity button
 *   Then should navigate to the create activity page
 *
 * Given a registered user on the create activity page
 *  When fill the form with valid data
 *  And click on the create button
 *   Then should send a post request to the API
 *   Then should navigate to the activities list page
 *   And should see the activity created
 */
describe("Given a registered user", () => {
  const API_URL = `${Cypress.env("apiUrl")}/activities`;
  const PAGE_URL = "/activities/new";
  beforeEach(() => {
    cy.visit(PAGE_URL);
  });
  it("When click on the create activity button then should navigate to the create activity page", () => {
    cy.get("form");
  });

  context("When fill the form with valid data", () => {
    const activity = {
      title: "Test activity",
      description: "Test description",
      location: "Test location",
    };
    beforeEach(() => {
      cy.fixture("activities").then((activitiesElement) => {
        const activities = activitiesElement as unknown as any[];
        cy.intercept("POST", API_URL, {
          body: activities,
        }).as("postActivity");
      });
      cy.get("input[name=title]").type(activity.title);
      cy.get("textarea[name=description]").type(activity.description);
      cy.get("input[name=location]").type(activity.location);
      cy.get("button[type=submit]").click();
    });
    it("Then should send a post request to the API", () => {
      cy.wait("@postActivity").then((interception) => {
        const { request } = interception;
        const payload = request.body;
        expect(payload.title).to.equal(activity.title);
        cy.log("Payload", payload);
        expect(payload.id).to.exist;
      });
    });
    it("Then should navigate to the activities list page", () => {
      cy.url().should("include", "/activities");
    });
  });
});

// To Do: Use Page Object pattern
