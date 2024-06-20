// invoke, then

/**
 * Given the list of activities 
 *  when click on a activities page activity link
 *    Then should navigate the book activity page
 *    And should display an article with activity information
 *    And should display info related to participants
 */
describe("Given the list of activities for an anonymous user", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get("#activities-list").as("listContent");
    cy.get("@listContent").find("div").first().find("a").as("firstActivityLink");
  });
  context("When click on a activities page activity link", () => {
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
    it("Then should navigate the book activity page", () => {
      const activitySlug = activityName.toLowerCase().replace(/ /g, "-");
      cy.url().should("include", activitySlug);
    });
    it("And should display an article with activity information", () => {
      cy.get("article h2").contains(activityName, { matchCase: false });
    });
    it("and should display info related to participants", () => {
      cy.get("article").within(() => {
        cy.get("li").should("contain", "Participants");
      });
    });
  });
});

