// fixtures and interceptors async then

/**
 * Given a registered user on the create activity page
 *  When fill the form with valid data
 *  And click on the create button
 *   Then should send a post request to the API
 *   And Then should navigate to the activities list page
 *   And should see the activity created
 */
describe("Given a registered user on the create activity page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/activities/new");
  });
  context("When fill the form with valid data", () => {
    let newActivity: any;
    beforeEach(() => {
      cy.fixture("new-activity").then((fixture) => {
        newActivity = fixture;
        cy.get("input[name=name]").clear().type(newActivity.name);
        cy.get("input[name=date]").clear().type(newActivity.date);
        cy.get("input[name=location]").clear().type(newActivity.location);
        cy.get("input[name=price]").clear().type(newActivity.price);
        cy.get("input[name=maxParticipants]").clear().type(newActivity.maxParticipants);
        cy.get("input[name=minParticipants]").clear().type(newActivity.minParticipants);
      });
    });
    it("Then should send a post request to the API", () => {
      const postActivityApiUrl = `${Cypress.env("apiUrl")}/activities`;
      cy.intercept("POST", postActivityApiUrl).as("postActivity");
      cy.get("button[type=submit]").click();
      cy.wait("@postActivity").then((interception) => {
        const { request, response } = interception;
        expect(request.body.name).to.equal(newActivity.name);
        cy.url().should("include", "/activities");
        cy.log("And Then should navigate to the activities list page");
        cy.get("#activities-list").find('[itemprop="name"]').should("contain", newActivity.name);
        cy.log("And should see the activity created");
      });
    });
  });
});
