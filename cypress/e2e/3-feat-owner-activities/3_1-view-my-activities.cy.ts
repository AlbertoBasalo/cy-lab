/**
 * Given an activity owner
 *  When visiting the activities mines page
 *   Then should see its own activities on any state
 *   Then should see activities name as a summary
 *   When selecting an activity
 *    Then should toggle details article
 *   When changing an activity state
 *    Then should send a request to the API
 */

import { getUserAccessToken } from "../../support/e2e";

describe("Given an activity owner", () => {
  const URL_MY_ACTIVITIES = "http://localhost:4200/activities/mines";
  let myActivities: any[] = [];
  beforeEach(() => {
    // cy.fixture("token").then((token) => {
    //   localStorage.setItem("user-access-token", JSON.stringify(token));
    // });
    cy.login();
    cy.fixture("activities").then((fixtureContent) => {
      const activities = fixtureContent as unknown as any[];
      const userId = getUserAccessToken().user.id;
      const URL_API_MY_ACTIVITIES = "http://localhost:3000/activities/?userId=" + userId;
      myActivities = activities.filter((activity: any) => activity.userId === userId);
      cy.intercept("GET", URL_API_MY_ACTIVITIES, {
        body: myActivities,
      }).as("getMyActivities");
    });
  });
  context("When visiting the activities mines page", () => {
    const itemQ = "details[name='activity-item']";
    beforeEach(() => {
      cy.visit(URL_MY_ACTIVITIES);
      cy.wait("@getMyActivities");
    });
    it("Then should see its own activities on any state", () => {
      cy.get(itemQ).should("have.length", myActivities.length);
    });
    it("Then should see activities name as a summary", () => {
      cy.get(`${itemQ} summary`).should("have.length", myActivities.length);
    });
    context("When selecting an activity", () => {
      beforeEach(() => {
        cy.get(`${itemQ} summary`).first().click();
      });
      it("Then should toggle details article", () => {
        cy.get(`${itemQ} article[name='details']`).first().should("be.visible");
      });
      context("When changing an activity state", () => {
        const itemQ = "details[name='activity-item']";
        const API_URL = "http://localhost:3000/activities/";
        beforeEach(() => {
          cy.intercept("PUT", API_URL + myActivities[0].id).as("putActivity");
          cy.get(`${itemQ} article[name='details'] button[name='change-state-to-draft']`)
            .first()
            .click();
        });
        it("Then should send a request to the API", () => {
          cy.wait("@putActivity").then((interception) => {
            const activity = interception.request.body;
            expect(activity.state).to.equal("draft");
          });
        });
      });
    });
  });
  after(() => {
    cy.logout();
  });
});
