/**
 * Given the Published Activities list
 *   when the Home page is loaded
 *    then should show the number of activities
 *    then should have a link to the activity page
 *    then should list in a monospace font
 *    then should show activities name, price, and date
 */

describe("Given the Published Activities list", () => {
  const API_URL = `${Cypress.env("apiUrl")}/activities*`;
  const LIST_CONTENT = 'main[name="list-content"]';
  let activitiesCounter = 0;
  let firstActivity: any = null;
  let firstSlug = "";
  beforeEach(() => {
    cy.fixture("activities").then((fixtureContent) => {
      const activities = fixtureContent as unknown as any[];
      const publishedActivities = activities.filter((a) => a.state === "published");
      activitiesCounter = publishedActivities.length;
      firstActivity = publishedActivities[0];
      firstSlug = firstActivity.slug;
      cy.intercept("GET", API_URL, {
        statusCode: 200,
        body: publishedActivities,
      }).as("getActivities");
    });
  });
  context("when the Home page is loaded", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(`${LIST_CONTENT}`).as("listContent");
      cy.get("@listContent").find("div").first().children('[name="title"]').as("firstTitle");
    });
    it("then should show the number of activities", () => {
      cy.get("[name='items-count']").should("contain.text", activitiesCounter);
      cy.get("[name='activity-item']").should("have.length", activitiesCounter);
    });
    it("then should have a link to the activity page", () => {
      cy.get("@firstTitle").children("a").should("have.attr", "href", `/activities/${firstSlug}`);
    });
    it("then should list in a monospace font", () => {
      cy.get("@firstTitle").should("have.css", "font-family", "monospace");
    });
    it("then should show activities date", () => {
      cy.get(`#${firstSlug}`).then((firstElement) => {
        const printedDate = firstElement.find("time").text();
        const actualDate = new Date(printedDate);
        const expectedDate = new Date(firstActivity.date);
        expect(actualDate.toLocaleDateString()).to.equal(expectedDate.toLocaleDateString());
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
