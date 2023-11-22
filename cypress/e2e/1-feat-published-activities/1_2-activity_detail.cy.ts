// invoke, then

/**
 * Given the list of activities at the activities page
 *  when click on a activities page activity link
 *    then should navigate the activity detail page
 *    and then should show an article with activity information
 *    and should show a button to book the activity
 */
describe("Given the list of activities at the activities page", () => {
  beforeEach(() => {
    cy.visit("/activities");
    cy.get("#activities-list").as("listContent");
    cy.get("@listContent").find("li").first().find("a").as("firstActivityLink");
  });
  context("when click on a activities page activity link", () => {
    let activityName = ""; // to be populated later
    beforeEach(() => {
      cy.get("@firstActivityLink")
        .invoke("text") // call any method on the jQuery object
        .then((content) => {
          // callback receives the result of the invocation
          activityName = content as unknown as string; // cast to string
        });
      cy.get("@firstActivityLink").click();
    });
    it("then should navigate the activity detail page", () => {
      cy.url().should("include", "/activities/");
      const activitySlug = activityName.toLowerCase().replace(/ /g, "-");
      cy.url().should("include", activitySlug);
    });
    it("and then should show an article with activity information", () => {
      cy.get("article h2").contains(activityName, { matchCase: false });
    });
    it("and should show a button to book the activity", () => {
      cy.get("article").within(() => {
        cy.get("button").should("contain", "Book");
      });
    });
  });
});
