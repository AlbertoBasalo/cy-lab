export function typeBlur(selector: string, value: unknown) {
  cy.get(selector).clear().type(value as string).blur()
}