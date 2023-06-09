/**
 * Given the Activities list
 *   should show the number of activities
 *   should show activities name, price, and date
 *   should have a link to the activity page
 *   should list in a monospace font
 *   should only show published activities
 */

describe("Given the Activities list", () => {
  const API_URL = "http://localhost:3000/activities?state=published";
  let publishedActivities: any[] = [];
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
    cy.fixture("activities").then((fixtureContent) => {
      const activities = fixtureContent as unknown as any[];
      publishedActivities = activities.filter((activity: any) => activity.state === "published");
      cy.intercept("GET", API_URL, {
        body: publishedActivities,
      });
    });
  });
  it("should show the number of activities", () => {
    cy.get("[name='items-count']").should("contain.text", publishedActivities.length);
    cy.get("[name='activity-item']").should("have.length", publishedActivities.length);
  });
  it("should show activities name, price, and date", () => {
    const firstActivity = publishedActivities[0];
    cy.get(`#${firstActivity.slug}`).then((firstActivityElement) => {
      expect(firstActivityElement.find('[name="title"]')).to.contain.text(firstActivity.title);
      expect(firstActivityElement.find('[itemprop="priceCurrency"]')).to.contain.text(
        firstActivity.price
      );
      const printedDate = firstActivityElement.find("time").text();
      const actual = new Date(printedDate).toLocaleDateString();
      const expected = new Date(firstActivity.date).toLocaleDateString();
      expect(actual).to.equals(expected);
    });
  });
  it("should have a link to the activity page", () => {
    const firstActivity = publishedActivities[0];
    cy.get("main[name='list-content'] div:nth-child(1) > [name='title'] a").should(
      "have.attr",
      "href",
      `/activities/${firstActivity.slug}`
    );
  });
  it("should list in a monospace font", () => {
    cy.get("main[name='list-content'] div:nth-child(1) > [name='title']").should(
      "have.css",
      "font-family",
      "monospace"
    );
  });
  it("should only show published activities", () => {
    cy.get("main[name='list-content'] div").should("not.contain.text", "draft");
  });
});
