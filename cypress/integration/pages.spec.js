/// <reference types="cypress" />

describe("Pages", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("Home page is loaded", () => {
    cy.get("h1").should("exist")
  })

  it("Blog-page is loaded", () => {
    cy.get("[data-testing=mainMenu__link]")
      .contains(/blog/i)
      .click()
    cy.get("h1").should("exist")
  })

  it("Recipes-page is loaded", () => {
    cy.get("[data-testing=mainMenu__link]")
      .contains(/recipes/i)
      .click()
    cy.get("h1").should("exist")
    cy.get("[data-testing=postPreview__container]").should("exist")
  })

  it("The vegan pantry-page is loaded", () => {
    cy.get("[data-testing=mainMenu__link]")
      .contains(/the vegan pantry/i)
      .click()
    cy.get("[data-testing=the-vegan-pantry__container]").should("exist")
  })
})
