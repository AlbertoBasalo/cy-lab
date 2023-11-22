// alias, get, find, within...

/**
 * Given the Published Activities list
 *   when the data is loaded
 *    then should show the list counter
 *    then should show the correct number of items
 *    then should show the same counter and number of activities
 *    then should show the name with a link to the activity detail
 *    then should show activities name, date and price
 */

describe("Given the Published Activities list", () => {
  const expectedActivities = 8;
  const expectedFirstActivity = { name: "Standup Surfing", slug: "standup-surfing" };
  beforeEach(() => {
    cy.visit("/activities");
  });
  context("when the data is loaded", () => {
    beforeEach(() => {
      cy.get("#activities-list").as("listContent");
    });
    it("then should show the list counter", () => {
      cy.get("#activities-count").should("have.text", expectedActivities);
    });
    it("then should show the correct number of items", () => {
      cy.get("#activities-list").find("li").should("have.length", expectedActivities);
    });
    it("then should show the same counter and number of activities", () => {
      cy.get("#activities-count").invoke("text").as("activitiesCount");
      cy.get<number>("@activitiesCount").then((activitiesCount) => {
        cy.log("activitiesCount", activitiesCount);
        cy.get("@listContent").find("li").should("have.length", activitiesCount);
      });
    });
    it("then should show the name with a link to the activity detail", () => {
      cy.get("#activities-list")
        .find("li")
        .first()
        .find("a")
        .should("have.text", expectedFirstActivity.name)
        .should("have.attr", "href", `/activities/${expectedFirstActivity.slug}`);
    });
    it("THEN should show activities name, date and price", () => {
      cy.get("@listContent").find("li").first().as("firstActivityElement");
      cy.get("@firstActivityElement").within(() => {
        cy.get('[itemprop="name"]');
        cy.get('[itemprop="date"]');
        cy.get('[itemprop="price"]');
      });
    });
  });
});
