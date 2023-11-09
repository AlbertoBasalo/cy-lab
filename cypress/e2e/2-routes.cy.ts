/**
 * The Activity Bookings navigation links
 *   should have a link to the repository page
 *   should have a header link with 'about' text
 *   should have a 'registerLink' id
 *   should navigate to the register page
 */
describe("The Activity Bookings navigation links", () => {
  const repoUrl = "https://github.com/AlbertoBasalo/ng-lab";
  const registerUrl = "http://localhost:4200/auth/register";
  before(() => {
    cy.log("1️⃣ Before ALL");
  });
  beforeEach(() => {
    cy.log("2️⃣ Before Each ");
    cy.visit("http://localhost:4200/");
  });
  it("should have a link to the repository page", () => {
    cy.get(`a[href='${repoUrl}']`);
  });
  it("should have a header link with 'about' text", () => {
    cy.get("header a") // Act
      .contains("about", { matchCase: false }); // Assert
  });
  it("should have a 'registerLink' id", () => {
    cy.get("#registerLink"); // Act Assert
  });
  it("should navigate to the register page", () => {
    cy.get("#registerLink") // Arrange
      .click(); // Act
    cy.url().should("eq", registerUrl); // Assert
  });
  afterEach(() => {
    cy.log("3️⃣ After Each");
  });
  after(() => {
    cy.log("4️⃣ After ALL");
  });
});
