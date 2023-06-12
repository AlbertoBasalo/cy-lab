/**
 * The sign-up form
 *     should have a form with 4 inputs and a submit button disabled
 *   when the users fills the form correctly
 *     should allow to submit the form
 *     should mark all inputs as valid
 *   when the user fills the form incorrectly
 *     should disabled the submit button if the form is invalid
 *     should mark the username as invalid if it is empty
 *     should mark the username as invalid after clear it
 *     should not show an error for user before interaction
 *     should show an error for user name while invalid
 *     should mark the username as valid if it is not empty
 *     should mark the email as invalid if it is not an email
 *  when the user resets the form
 *     should clear the form when the reset button is clicked
 */

describe("The sign-up form", () => {
  const signUpUrl = "http://localhost:4200/auth/sign-up";
  const expectedInputs = 4;
  beforeEach(() => {
    cy.visit(signUpUrl);
  });
  it("should have a form with 4 inputs and a submit button disabled", () => {
    // cy.get("form");
    cy.get("form input") // Act
      .should("have.length", expectedInputs); // Assert
    cy.get("form button[type='submit']") // Act
      .should("be.disabled"); // Assert
  });
  context("when the users fills the form correctly", () => {
    beforeEach(() => {
      // Arrange
      cy.get("#username").clear().type("John");
      cy.get("[type='email']").clear().type("john.doe@acme.com");
      cy.get("[type='password']").first().clear().type("1234a");
      cy.get("[name='repeatPassword']").clear().type("1234a");
    });
    it("should allow to submit the form", () => {
      cy.get("form button[type='submit']") // Act
        .should("be.enabled"); // Assert
    });
    it("should mark all inputs as valid", () => {
      cy.get("form input[aria-invalid='false']").should("have.length", expectedInputs);
    });
  });
  context("when the user fills the form incorrectly", () => {
    it("should disabled the submit button if the form is invalid", () => {
      cy.get("form button").should("be.disabled");
    });
    it("should mark the username as invalid if it is empty", () => {
      cy.get("#username").should("have.class", "ng-invalid");
    });
    it("should mark the username as invalid after clear it", () => {
      cy.get("#username").type("John");
      cy.get("#username").clear();
      cy.get("#username").should("have.class", "ng-invalid");
    });
    it("should not show an error for user before interaction", () => {
      cy.get("[data-test='username.error']").should("not.be.visible");
    });
    it("should show an error for user name while invalid", () => {
      cy.get("#username").clear().type("a");
      cy.get("[data-test='username.error']").should("be.visible");
    });
    it("should mark the username as valid if it is not empty", () => {
      cy.get("#username").clear().type("John");
      cy.get("#username").should("have.class", "ng-valid");
    });
    it("should mark the email as invalid if it is not an email", () => {
      cy.get('[type="email"]').clear().type("not-an-email");
      cy.get('[type="email"]').should("have.class", "ng-invalid");
    });
  });
  context("when the user resets the form", () => {
    it("should clear the form when the reset button is clicked", () => {
      cy.get("#username").clear().type("John");
      cy.get('[type="email"]').clear().type("not-an-email");
      cy.get('[type="password"]').first().type("123a");
      cy.get('[name="repeatPassword"]').type("123a");
      cy.get("form button.contrast.outline").click();
      cy.get("#username").should("have.value", "");
      cy.get('[type="email"]').should("have.value", "");
      cy.get('[type="password"]').first().should("have.value", "");
      cy.get('[name="repeatPassword"]').should("have.value", "");
    });
  });
  afterEach(() => {
    cy.contains("button", "Reset").click();
  });
});
