// intercept

/**
 * Given a user at login flow
 *  When types valid credentials
 *    Then should send the form data to the server and redirect user to home and display user menu
 *  When types invalid  credentials
 *    Then should get a 404 response and still display anonymous menu
 */
describe("Given a user at login flow", () => {
  const loginUrl = "/auth/login";
  const homeFullUrl = Cypress.config("baseUrl") + "/home";
  const profileUrl = "/auth/profile";
  const credentials: any = {
    email: "test@valid.org",
    password: "1234",
  };
  const loginApiUrl = `${Cypress.env("apiUrl")}/login`;
  beforeEach(() => {
    cy.intercept("POST", loginApiUrl).as("postLogin");
    cy.visit(loginUrl);
  });
  context.skip("when types valid credentials", () => {
    beforeEach(() => {
      cy.get("#email").clear().type(credentials.email);
      cy.get("#password").clear().type(credentials.password);
      cy.get("form button[type=submit]").should("be.enabled").click();
    });
    it("Then should send the form data to the server and redirect user to home and display user menu", () => {
      const expectedPayload = credentials;
      cy.get("@postLogin") // wait for the request
        .its("request.body") // get the request body
        .should("deep.equal", expectedPayload); // compare with the expected payload
      cy.url() // wait for the redirection
        .should("equal", homeFullUrl); // compare with the expected url
      cy.get(`a[href="${profileUrl}"]`) // wait for the user menu
        .should("be.visible"); // assert it is visible
    });
  });

  context("When types invalid credentials", () => {
    beforeEach(() => {
      cy.get("#email").clear().type(credentials.email);
      cy.get("#password").clear().type("wrong_password");
      cy.get("form button[type=submit]").should("be.enabled").click();
    });
    it("Then should get a 404 response and still display anonymous menu", () => {
      const INVALID_CODE = 404;
      cy.get("@postLogin") // wait for the request
        .its("response.statusCode") // get the response status code
        .should("equal", INVALID_CODE); // compare with the expected status code
      cy.get(`a[href="${loginUrl}"]`) // wait for the login menu
        .should("be.visible"); // assert it is visible
    });
  });
});
