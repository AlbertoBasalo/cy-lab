// ToDo: use fixtures
// ToDo: use Page Object Model


// gwt scenarios with beforeEach hooks

/**
 * Given a logged in user visiting the new activity page
 *  When fills the form with valid data
 *    Then should sent the form data to the server
 */

describe("Given a logged in user visiting the new activity page", () => {
  const activityUrl = "/activity";
  const activityApiUrl = `${Cypress.env("apiUrl")}/activities`;
  const activityData = {
    name: "Surfing",
    location: "Lake",
    date: "2022-12-31",
    price: 50,
    minParticipants: 5,
    maxParticipants: 10,
  };
  beforeEach(() => {
    cy.login();
    cy.visit(activityUrl);
  });
  context("When fills the form with valid data", () => {
    beforeEach(() => {
      cy.intercept("POST", activityApiUrl).as("postActivity");
      cy.get('#name').clear().type(activityData.name);
      cy.get("#location").clear().type(activityData.location);
      cy.get("#date").clear().type(activityData.date);
      cy.get("#price").clear().type(activityData.price.toString());
      cy.get("#minParticipants").clear().type(activityData.minParticipants.toString());
      cy.get("#maxParticipants").clear().type(activityData.maxParticipants.toString());
      cy.get("button").click();
    });
    it("Then should sent the form data to the server", () => {
      cy.wait("@postActivity").then((interception) => {
        const { request } = interception;
        expect(request.body).to.deep.equal(activityData);
      });
    });
  });
});
