/// <reference types="Cypress" />

describe("Accessibility tests", () => {
  const checkAccessibilityOnPage = ({ path, name, only }) => {
    const injectBody = () => {
      cy.visit(path).get("main").injectAxe().wait(500).checkA11y()
    }
    if (only) {
      it.only(`Has no detectable accessibility violations on ${name} page`, () => {
        injectBody()
      })
    } else {
      it(`Has no detectable accessibility violations on ${name} page`, () => {
        injectBody()
      })
    }
  }
  checkAccessibilityOnPage({ path: "/", name: "home" })
  checkAccessibilityOnPage({ path: "/recipes", name: "recipes" })
  checkAccessibilityOnPage({
    path: "/recipes/vegan-mafe",
    name: "a recipe",
  })
  checkAccessibilityOnPage({
    path: "/the-vegan-pantry",
    name: "the vegan pantry",
  })
})
