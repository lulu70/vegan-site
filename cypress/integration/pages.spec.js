/// <reference types="cypress" />

describe("Pages loading", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.waitForRouteChange()
  })

  it("Home page is loaded", () => {
    cy.url().should("exist")
    cy.get("h1").should("be.visible")
  })

  it("Blog-page is loaded", () => {
    cy.findAllByText(/blog/i)
      .first()
      .click()
    cy.get("h1").should("be.visible")
    cy.url().should("include", "/blog")
  })

  it("Recipes-page is loaded", () => {
    cy.findAllByText(/recipes/i)
      .first()
      .click()
    cy.get("h1").should("be.visible")
    cy.findAllByTestId("postPreview__container").should("be.visible")
  })

  it("The vegan pantry-page is loaded", () => {
    cy.findAllByText(/the vegan pantry/i)
      .first()
      .click()
    cy.findByTestId("the-vegan-pantry__container").should("exist")
  })
})
