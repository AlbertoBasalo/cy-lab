// intercept

/**
 * Given a user at register flow
 *  When types valid credentials
 *    Then should send the form data to the server And displays user menu
 *  when re-types credentials
 *    should get a 400 response 
 */
describe("Given a user at login flow", () => {
  const registerUrl = "/auth/register";
  const credentials: any = {
    username: "Test User",
    email: "test@valid.org",
    password: "1234",
    terms: true,
  };
  const registerApiUrl = `${Cypress.env("apiUrl")}/register`;
  beforeEach(() => {
    cy.intercept("POST", registerApiUrl).as("postRegister");
    cy.visit(registerUrl);
  });
  context.only("When types valid credentials", () => {
    beforeEach(() => {
      cy.get("#username").clear().type(credentials.username).blur();
      cy.get("#email").clear().type(credentials.email).blur();
      cy.get("#password").clear().type(credentials.password).blur();
      cy.get("#confirm").clear().type(credentials.password).blur();
      cy.get("#terms").invoke("prop", "checked", true).trigger("change");
      cy.get("form button[type=submit]").should("be.enabled").click();
    });
    it("Then should send the form data to the server And displays user menu", () => {
      const expectedPayload = credentials;
      const ACCEPTED_CODE = 201;
      cy.get("@postRegister") // wait for the request
        .its("request.body") // get the request body
        .should("deep.equal", expectedPayload); // compare with the expected payload
      cy.get("@postRegister") // wait for the request
        .its("response.statusCode") // get the response status code
        .should("equal", ACCEPTED_CODE); // compare with the expected status code
      cy.get(`a[href="/activity"]`) // has logged in options
        .should("be.visible"); // assert it is visible
    });
  });

  context.skip("When types invalid credentials", () => {
    beforeEach(() => {
      cy.get("#username").clear().type(credentials.username).blur();
      cy.get("#email").clear().type(credentials.email).blur();
      cy.get("#password").clear().type(credentials.password).blur();
      cy.get("#confirm").clear().type(credentials.password).blur();
      cy.get("#terms").invoke("prop", "checked", true).trigger("change");
      cy.get("form button[type=submit]").should("be.enabled").click();
    });
    it("Then should get a 400 response and still display anonymous menu", () => {
      const INVALID_CODE = 400;
      cy.get("@postRegister") // wait for the request
        .its("response.statusCode") // get the response status code
        .should("equal", INVALID_CODE); // compare with the expected status code
      cy.get(`a[href="/auth/login"]`) // wait for the login menu
        .should("be.visible"); // assert it is visible
    });
  });
});
