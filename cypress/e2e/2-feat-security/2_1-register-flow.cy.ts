/**
 * Given a user at registration flow
 *  when sends valid new credentials
 *    should send the form data to the server
 *    should store the token in the local storage
 *    should redirect the user to the home page
 *    should display user menu
 *  when sends invalid new credentials
 *    should show an error dialog
 *    should display anonymous menu
 */
describe("Given a user at registration flow", () => {
  const URL_REGISTER = "http://localhost:4200/auth/sign-up";
  const API_REGISTER = "http://localhost:3000/register";
  context("when sends valid new credentials", () => {
    beforeEach(() => {
      cy.visit(URL_REGISTER);
      cy.intercept("POST", API_REGISTER, {
        statusCode: 201,
        fixture: "token",
      }).as("register");
      cy.get("#username").clear().type("John Doe");
      cy.get('[type="email"]').clear().type("john@doe.com");
      cy.get('[type="password"]').first().type("123a");
      cy.get('[name="repeatPassword"]').type("123a");
      cy.get("form button[type=submit]").click();
    });
    it("should send the form data to the server", () => {
      cy.wait("@register");
      const expectedPayload = {
        username: "John Doe",
        email: "john@doe.com",
        password: "123a",
      };
      cy.get("@register").its("request.body").should("deep.equal", expectedPayload);
    });
    it("should store the token in the local storage", () => {
      cy.wait("@register");
      const userAccessToken = localStorage.getItem("user-access-token") || "";
      const actualToken = JSON.parse(userAccessToken);
      const expectedToken = {
        accessToken: "xxx.xxx.xxx",
        user: { id: 1, name: "John Doe", email: "john@doe.com" },
      };
      expect(actualToken).to.deep.equal(expectedToken);
    });
    it("should redirect the user to the home page", () => {
      cy.wait("@register");
      cy.url().should("equal", "http://localhost:4200/");
    });
    it("should display user menu", () => {
      cy.wait("@register");
      cy.get("#user-menu").should("be.visible");
    });
  });

  context("when sends invalid new credentials", () => {
    beforeEach(() => {
      cy.visit(URL_REGISTER);
      cy.intercept("POST", API_REGISTER, {
        statusCode: 400,
        body: "Invalid credentials",
      }).as("register");
      cy.get("#username").clear().type("John Doe");
      cy.get('[type="email"]').clear().type("john@doe.com");
      cy.get('[type="password"]').first().type("123a");
      cy.get('[name="repeatPassword"]').type("123a");
      cy.get("form button[type=submit]").click();
    });

    it("should show the error dialog", () => {
      cy.wait("@register");
      cy.get("#error-dialog").should("be.visible");
    });

    it("should display anonymous menu", () => {
      cy.wait("@register");
      cy.get("#anonymous-menu").should("be.visible");
    });
  });
});
