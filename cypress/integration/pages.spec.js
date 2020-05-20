/// <reference types="cypress" />

describe("Pages loading", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.waitForRouteChange().injectAxe()
  })
  it("Has no detectable accessibility violations on load", () => {
    cy.checkA11y()
  })
  it("Home page is loaded", () => {
    cy.checkA11y()
    cy.url().should("exist")
    cy.get("h1").should("be.visible")
  })

  it("Blog-page is loaded", () => {
    cy.findAllByText(/blog/i)
      .first()
      .click()
    cy.checkA11y()
    cy.get("h1").should("be.visible")
    cy.url().should("include", "/blog")
  })

  it("Recipes-page is loaded", () => {
    cy.findAllByText(/recipes/i)
      .first()
      .click()
    cy.checkA11y()
    cy.get("h1").should("be.visible")
    cy.findAllByTestId("postPreview__container").should("be.visible")
  })

  it("The vegan pantry-page is loaded", () => {
    cy.findAllByText(/the vegan pantry/i)
      .first()
      .click()
    cy.checkA11y()
    cy.findByTestId("the-vegan-pantry__container").should("exist")
  })

  it("The first recipe page is loaded", () => {
    cy.findAllByText(/recipes/i)
      .first()
      .click()
    cy.checkA11y()
    cy.findAllByTestId("postPreview__container")
      .first()
      .click()
    cy.checkA11y()
    cy.get("h1").should("be.visible")
    cy.findByTestId("blogPostTemplate__date")
      .should("be.visible")
      .invoke("text")
      .and("have.length.greaterThan", 1)
    cy.get("img").should("have.length.greaterThan", 1)
  })
})
