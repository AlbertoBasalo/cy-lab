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
  const LIST_CONTENT = 'main[name="list-content"]';
  let activitiesCounter = 0;
  let firstSlug = "";
  context("when the Home page is loaded", () => {
    beforeEach(() => {
      cy.visit(PAGE_URL);
      cy.get(`${LIST_CONTENT}`).as("listContent");
      cy.get("@listContent")
        .find("div")
        .its("length")
        .then((length) => (activitiesCounter = length));
      cy.get("@listContent")
        .find("div")
        .first()
        .invoke("attr", "id")
        .then((id) => (firstSlug = id as string));
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
      cy.get(`#${firstSlug}`).find("time");
    });
    it.only("THEN should show activities name, price, and date", () => {
      cy.get(`#${firstSlug}`).as("firstActivityElement");
      cy.get("@firstActivityElement")
        .children('[name="title"]') // act
        .should("exist"); // assert
      cy.get("@firstActivityElement")
        .find('[data-itemprop="priceCurrency"]') // act
        .should("exist"); // assert
    });
  });
});
