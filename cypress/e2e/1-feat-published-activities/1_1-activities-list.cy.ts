/**
 * Given the Published Activities list
 *   when the Home page is loaded
 *    then should show the number of activities
 *    then should have a link to the activity page
 *    then should list in a monospace font
 *    then should show activities name, price, and date
 */

describe("Given the Published Activities list", () => {
  const PAGE_URL = "/";
  const API_URL = `${Cypress.env("apiUrl")}/activities?state=published`;
  const LIST_SELECTOR = "main[name='list-content']";
  let publishedActivities: any[] = [];
  let activitiesCounter = 0;
  let firstActivity: any = null;
  beforeEach(() => {
    cy.fixture("activities").then((fixtureContent) => {
      const activities = fixtureContent as unknown as any[];
      publishedActivities = activities.filter((activity: any) => activity.state === "published");
      activitiesCounter = publishedActivities.length;
      firstActivity = publishedActivities[0];
      cy.intercept("GET", API_URL, {
        body: publishedActivities,
      });
    });
  });
  context("when the page is loaded", () => {
    beforeEach(() => {
      cy.visit(PAGE_URL);
      cy.get(`${LIST_SELECTOR} div`).as("activityItems");
    });
    it("then should show the number of activities", () => {
      cy.get("[name='items-count']").should("contain.text", activitiesCounter);
      cy.get("[name='activity-item']").should("have.length", activitiesCounter);
    });

    it("then should have a link to the activity page", () => {
      // cy.get(`main[name='list-content'] div:nth-child(1) > [name='title'] a`).should(
      //   "have.attr",
      //   "href",
      //   `/activities/${firstActivity.slug}`
      // );
      // cy.get(`${LIST_SELECTOR} div:nth-child(1) > [name='title'] a`).should(
      //   "have.attr",
      //   "href",
      //   `/activities/${firstActivity.slug}`
      // );
      cy.get(`${LIST_SELECTOR} div`)
        .first()
        .children(`[name=title]`)
        .children("a")
        .should("have.attr", "href", `/activities/${firstActivity.slug}`);
    });
    it("then should list in a monospace font", () => {
      // cy.get(`${LIST_SELECTOR} div:nth-child(1) > [name='title']`).should(
      //   "have.css",
      //   "font-family",
      //   "monospace"
      // );
      cy.get("@activityItems")
        .first()
        .children(`[name='title']`)
        .should("have.css", "font-family", "monospace");
    });
    it("then should show activities name, price, and date", () => {
      cy.get(`#${firstActivity.slug}`).then((firstActivityElement) => {
        expect(firstActivityElement.find('[name="title"]')).to.contain.text(firstActivity.title);
        expect(firstActivityElement.find('[data-itemprop="priceCurrency"]')).to.contain.text(
          firstActivity.price
        );
        const printedDate = firstActivityElement.find("time").text();
        const actual = new Date(printedDate).getFullYear();
        const expected = new Date(firstActivity.date).getFullYear();
        expect(actual).to.equals(expected);
      });
    });
    it("THEN should show activities name, price, and date", () => {
      cy.get(`#${firstActivity.slug}`).as("firstActivityElement");
      cy.get("@firstActivityElement")
        .children('[name="title"]') // act
        .contains(firstActivity.title); // assert
      cy.get("@firstActivityElement")
        .find('[data-itemprop="priceCurrency"]') // act
        .contains(firstActivity.price); // assert
      const expected = new Date(firstActivity.date).getFullYear();
      cy.get("@firstActivityElement")
        .find("time")
        .invoke("text") // like a sub query
        .should("contains", expected);
    });
  });
});
