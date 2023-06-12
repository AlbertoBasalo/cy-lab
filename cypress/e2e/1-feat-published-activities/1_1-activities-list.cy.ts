/**
 * Given the Activities list
 *   when the page is loaded with the published activities
 *    then should show the number of activities
 *    then should show activities name, price, and date
 *    then should have a link to the activity page
 *    then should list in a monospace font
 *    then should only show published activities
 */

describe("Given the Activities list", () => {
  const PAGE_URL = "http://localhost:4200/";
  const API_URL = "http://localhost:3000/activities?state=published";
  let publishedActivities: any[] = [];
  let firstActivity: any = null;
  context("when the page is loaded with the published activities", () => {
    beforeEach(() => {
      cy.visit(PAGE_URL);
      cy.fixture("activities").then((fixtureContent) => {
        const activities = fixtureContent as unknown as any[];
        publishedActivities = activities.filter((activity: any) => activity.state === "published");
        firstActivity = publishedActivities[0];
        cy.intercept("GET", API_URL, {
          body: publishedActivities,
        });
      });
    });
    it("then should show the number of activities", () => {
      cy.get("[name='items-count']").should("contain.text", publishedActivities.length);
      cy.get("[name='activity-item']").should("have.length", publishedActivities.length);
    });
    it("then should show activities name, price, and date", () => {
      cy.get(`#${firstActivity.slug}`).then((firstActivityElement) => {
        expect(firstActivityElement.find('[name="title"]')).to.contain.text(firstActivity.title);
        expect(firstActivityElement.find('[data-itemprop="priceCurrency"]')).to.contain.text(
          firstActivity.price
        );
        const printedDate = firstActivityElement.find("time").text();
        const actual = new Date(printedDate).toLocaleDateString();
        const expected = new Date(firstActivity.date).toLocaleDateString();
        expect(actual).to.equals(expected);
      });
    });
    it("then should have a link to the activity page", () => {
      cy.get("main[name='list-content'] div:nth-child(1) > [name='title'] a").should(
        "have.attr",
        "href",
        `/activities/${firstActivity.slug}`
      );
    });
    it("then should list in a monospace font", () => {
      cy.get("main[name='list-content'] div:nth-child(1) > [name='title']").should(
        "have.css",
        "font-family",
        "monospace"
      );
    });
    it("then should only show published activities", () => {
      cy.get("main[name='list-content'] div").should("not.contain.text", "draft");
    });
  });
});
