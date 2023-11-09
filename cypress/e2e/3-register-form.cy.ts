/**
 * The register form
 *     should have a form with 4 inputs and a submit button disabled
 *   when the users fills the form correctly
 *     should allow to submit the form
 *     should mark all inputs as valid
 *   when the user fills the form incorrectly
 *     should disabled the submit button when start
 *     should mark the username as invalid if it is empty
 *     should mark the username as invalid after clear it
 *     should not show an error message to the user before interaction
 *     should show an error message to the user after typing invalid data
 *     should mark the username as valid if it is not empty
 *     should mark the email as invalid if it is not an email
 *  when the user resets the form
 *     should clear the form when the reset button is clicked
 */

describe("The register form", () => {
  const signUpUrl = "http://localhost:4200/auth/register";
  const expectedInputs = 4;
  beforeEach(() => {
    cy.visit(signUpUrl);
  });
  it("should have a form with 5 inputs and a submit button disabled", () => {
    cy.get("form fieldset input") // Act
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
      cy.get("#repeatPassword").clear().type("1234a");
    });
    it("should allow to submit the form", () => {
      // Assert
      cy.get("form button[type='submit']").should("be.enabled");
    });
    it("should mark all inputs as valid", () => {
      // Assert
      cy.get("form input[aria-invalid='false']").should("have.length", expectedInputs);
    });
  });
  context("when the user resets the form", () => {
    it("should clear the form when the reset button is clicked", () => {
      // Arrange
      cy.get("#username").clear().type("John");
      cy.get('[type="email"]').clear().type("not-an-email");
      cy.get('[type="password"]').first().type("123a");
      cy.get("#repeatPassword").type("123a");
      // Act
      cy.get("input[type='reset']").click();
      // Assert
      cy.get("#username").should("be.empty");
      cy.get('[type="email"]').should("be.empty");
      cy.get('[type="password"]').first().should("be.empty");
      cy.get("#repeatPassword").should("be.empty");
    });
  });
  context("when the user fills the form incorrectly", () => {
    it("should disabled the submit button when start ", () => {
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
    it("should not show an error message to the user before interaction", () => {
      cy.get("input[type='reset']").click();
      cy.get("#username-error").should("not.exist");
    });
    it("should show an error message to the user after typing invalid data", () => {
      cy.get("#username").clear().type("a");
      cy.get("#username").blur();
      cy.get("#username-error").should("be.visible");
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

  afterEach(() => {
    cy.get("input[type='reset']").click();
  });
});
