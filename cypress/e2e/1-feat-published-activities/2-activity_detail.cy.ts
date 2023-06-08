/**
 * Given the list of activities at the Home page
 *  when click on a home page activity link
 *  then should navigate the activity detail page
 */
describe("Given the list of activities at the Home page", () => {
  const API_URL = "http://localhost:3000/activities?state=published";
  let publishedActivities: any[] = [];
  let firstActivity: any = {};
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
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
 * given the detail page of the first activity
 *    then should load the activity information
 *   when data is loaded
 *    then should show the full activity information
 */
describe("Given the detail page of the first activity", () => {
  let publishedActivities: any[] = [];
  let firstActivity: any = {};
  const API_URL = "http://localhost:3000/activities?slug=";
  beforeEach(() => {
    cy.fixture("activities").then((activitiesElement) => {
      const activities = activitiesElement as unknown as any[];
      publishedActivities = activities.filter((activity: any) => activity.state === "published");
      firstActivity = publishedActivities[0];
      cy.visit(`http://localhost:4200/activities/${firstActivity.slug}`);
      cy.intercept("GET", `${API_URL}${firstActivity.slug}`, cy.spy().as("getActivity"));
    });
  });
  it("then should load the activity information", () => {
    cy.get("@getActivity").should("have.been.calledOnce");
  });
  context("when data is loaded", () => {
    beforeEach(() => {
      cy.intercept("GET", `${API_URL}${firstActivity.slug}`, {
        body: [firstActivity],
      });
      // cy.wait("@getActivity");
    });
    it("then should show the full activity information", () => {
      cy.get("article").should("be.visible");
    });
  });
});
