/**
 * Given the list of activities at the Home page
 *  when click on a home page activity link
 *    then should navigate the activity detail page
 */
describe("Given the list of activities at the Home page", () => {
  const PAGE_URL = "/";
  const API_URL = `${Cypress.env("apiUrl")}/activities?state=published`;
  let publishedActivities: any[] = [];
  let firstActivity: any = {};
  beforeEach(() => {
    cy.visit(PAGE_URL);
    cy.fixture("activities").then((activitiesElement) => {
      const activities = activitiesElement as unknown as any[];
      publishedActivities = activities.filter((activity: any) => activity.state === "published");
      firstActivity = publishedActivities[0];
      cy.intercept("GET", API_URL, {
        body: publishedActivities,
      });
    });
  });
  context("when click on a home page activity link", () => {
    beforeEach(() => {
      cy.get(`#${firstActivity.slug} a`).click();
    });
    it("then should navigate the activity detail page", () => {
      cy.url().should("include", `/activities/${firstActivity.slug}`);
    });
  });
});

/**
 * Given the detail page of the first activity
 *   then should send request to load the activity information
 *   when data is loaded
 *     then should show an article with activity information
 */
describe("Given the detail page of the first activity", () => {
  const API_URL = `${Cypress.env("apiUrl")}/activities?slug=`;
  const PAGE_URL = "/activities";
  let publishedActivities: any[] = [];
  let firstActivity: any = {};
  beforeEach(() => {
    cy.fixture("activities").then((activitiesElement) => {
      const activities = activitiesElement as unknown as any[];
      publishedActivities = activities.filter((activity: any) => activity.state === "published");
      firstActivity = publishedActivities[0];
      cy.visit(`${PAGE_URL}/${firstActivity.slug}`);
      cy.intercept("GET", `${API_URL}${firstActivity.slug}`, cy.spy().as("getActivity"));
    });
  });
  it("then should send request to load the activity information", () => {
    cy.get("@getActivity").should("have.been.called");
  });
  context("when data is loaded", () => {
    beforeEach(() => {
      cy.intercept("GET", `${API_URL}${firstActivity.slug}`, {
        body: [firstActivity],
      });
    });
    it("then should show an article with activity information", () => {
      cy.get(`article[name='${firstActivity.slug}']`).should("be.visible");
    });
  });
});
