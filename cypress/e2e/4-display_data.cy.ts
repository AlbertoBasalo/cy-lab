// Given When Then, get find within

/**
 * Given The Activities page with data
 *  when data arrives
 *   then should have main list content
 *   then should not show an error message
 *   then should not show a pending message
 *  when the list is displayed
 *   then should show the list counter
 *   then should show the correct number of items
 *   then should show the name with a link to the activity detail
 *   then should show the activity main data
 */

describe("Given The Activities page", () => {
  beforeEach(() => {
    cy.visit("/activities");
  });
  context("when data arrives", () => {
    it("then should have main list content", () => {
      cy.get("#activities-list");
    });
    it("then should not show an error message", () => {
      cy.get("#error").should("not.exist");
    });
    it("then should not show a pending message", () => {
      cy.get("#pending").should("not.exist");
    });
  });
  context("when the list is displayed", () => {
    const expectedActivities = 8;
    const expectedFirstActivity = { name: "Standup Surfing", slug: "standup-surfing"};
    it("then should show the list counter", () => {
      cy.get("#activities-count").should("have.text",expectedActivities);
    });
    it("then should show the correct number of items", () => {
      cy.get("#activities-list").find("li").should("have.length", expectedActivities);
    });
    it("then should show the name with a link to the activity detail", () => {
      cy.get("#activities-list")
        .find("li")
        .first()
        .find("a")
        .should("have.text", expectedFirstActivity.name)
        .should("have.attr", "href", `/activities/${expectedFirstActivity.slug}`);
    });
    it("then should show the activity main data", () => {
      cy.get("#activities-list li:first-child")
        .within(() => {
          cy.get("[itemprop='name']")
          cy.get("[itemprop='date']")
          cy.get("[itemprop='price']");
        });
    });
  });
});
