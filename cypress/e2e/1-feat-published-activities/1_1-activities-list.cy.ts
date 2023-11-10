/**
 * Given the Published Activities list
 *   when the Home page is loaded
 *    then should have a link to the activity page
 *    then should show the counter and the number of activities
 *    then should show activities name, date and price
 */

describe("Given the Published Activities list", () => {
  context("when the Home page is loaded", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("#activities-list").as("listContent");
    });
    it("then should have a link to the activity page", () => {
      cy.get("@listContent").find("a").should("have.attr", "href");
    });
    it("then should show the counter and the number of activities", () => {
      cy.get("#activities-count").invoke("text").as("activitiesCount");
      cy.get<number>("@activitiesCount").then((activitiesCount) => {
        cy.log("activitiesCount", activitiesCount);
        cy.get("@listContent").find("li").should("have.length", activitiesCount);
      });
    });
    it("THEN should show activities name, date and price", () => {
      cy.get("@listContent").find("li").first().as("firstActivityElement");
      // cy.get("@firstActivityElement").get('[itemprop="name"]');
      // cy.get("@firstActivityElement").children('[itemprop="date"]');
      // cy.get("@firstActivityElement").find('[itemprop="price"]');
      cy.get("@firstActivityElement").within(() => {
        cy.get('[itemprop="name"]');
        cy.get('[itemprop="date"]');
        cy.get('[itemprop="price"]');
      });
    });
  });
});
