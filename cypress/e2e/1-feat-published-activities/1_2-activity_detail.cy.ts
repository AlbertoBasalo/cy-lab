/**
 * Given the list of activities at the Home page
 *  when click on a home page activity link
 *    then should navigate the activity detail page
 *    then should show an article with activity information
 */
describe("Given the list of activities at the Home page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#activities-list").as("listContent");
    cy.get("@listContent").find("li").first().find("a").as("firstActivityLink");
  });
  context("when click on a home page activity link", () => {
    let activityName = "";
    beforeEach(() => {
      cy.get("@firstActivityLink").invoke("text").as("activityName");
      cy.get("@activityName").then((content) => {
        activityName = content as unknown as string;
        cy.get("@firstActivityLink").click();
      });
    });
    it("then should navigate the activity detail page", () => {
      cy.url().should("include", "/activities/");
      const activitySlug = activityName.toLowerCase().replace(/ /g, "-");
      cy.url().should("include", activitySlug);
    });
    it("then should show an article with activity information", () => {
      cy.get("article").within(() => {
        cy.get("h2").contains(activityName, { matchCase: false });
        cy.get("button").should("contain", "Book");
      });
    });
  });
});
