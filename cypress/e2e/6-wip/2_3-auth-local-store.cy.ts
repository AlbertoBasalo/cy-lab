// it.skip("should store the token in the local storage", () => {
//   cy.wait("@postRegister");
//   const userAccessToken = localStorage.getItem("user-access-token") || "";
//   const actualToken = JSON.parse(userAccessToken);
//   const expectedToken = {
//     accessToken: "xxx.xxx.xxx",
//     user: { id: 1, name: NEW_USER.username, email: NEW_USER.email },
//   };
//   expect(actualToken).to.deep.equal(expectedToken);
// });

// cy.fixture("token.json").then((token) => {
//   localStorage.setItem("user-access-token", JSON.stringify(token));
//   cy.intercept("GET", API_URL).as("getActivities");
// });
// it("should send the token to the server", () => {
//   cy.wait("@getActivities").then((interception) => {
//     const token = interception.request.headers.authorization;
//     expect(token).to.contain("Bearer");
//   });
// });

/**
 * Given a secured endpoint returning 401
 *  when the user visits a page calling it
 *   should be redirected to the register page
 */
// describe("Given a secured endpoint returning 401", () => {
//   const REGISTER_URL = "http://localhost:4200/auth/sign-up";
//   const PAGE_URL = "http://localhost:4200/activities/mines";
//   const API_URL = `${Cypress.env("apiUrl")}/activities?userId=`;
//   beforeEach(() => {
//     cy.intercept("GET", API_URL, {
//       statusCode: 401,
//       body: "Unauthorized",
//     }).as("getSecuredApi");
//   });
//   context("when the user visits a page calling it", () => {
//     beforeEach(() => {
//       cy.visit(PAGE_URL);
//     });
//     it("should be redirected to the register page", () => {
//       cy.wait("@getSecuredApi");
//       cy.url().should("equal", REGISTER_URL);
//     });
//   });
// });

// cy.fixture("token.json").then((token) => {
//   localStorage.setItem("user-access-token", JSON.stringify(token));
//   cy.intercept("GET", API_URL).as("getActivities");
// });
