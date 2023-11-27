// page objects

import { ActivitiesPage } from "../../support/pages/activities.page";

/**
 * Given I am a valid logged-in user visiting the activities page
 *  When I search for "diving"
 *    Then I should see a list of activities containing "diving" in their title
 */
describe("Given I am a valid logged-in user visiting the activities page", () => {
  const activitiesPage = new ActivitiesPage();
  beforeEach(() => {
    // Arrange
    activitiesPage.visit();
  });
  context("When I search for 'diving'", () => {
    beforeEach(() => {
      // Act
      activitiesPage.getSearchInput().clear().type("diving");
    });
    it("Then I should see a list of activities containing 'diving' in their title", () => {
      // Assert
      activitiesPage.getActivitiesListItems().should("have.length", 2);
    });
  });
});
