/// <reference types="cypress" />
import recipesIngredients from "../../content/recipesIngredients"
const recipes = Object.keys(recipesIngredients)

describe("Search working", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.findByTestId("header__searchIcon").click()
    cy.get("main")
    cy.injectAxe()
    cy.wait(500)
  })
  it("loads", () => {
    cy.findByText(/search/i).should("be.visible")
    cy.findByTestId("searchInput__closeButton").should("be.visible")
    cy.get("input").should("be.visible")
    cy.findAllByTestId("postPreview__container").should(
      "have.length",
      recipes.length
    )
    cy.checkA11y()
  })
  it("types matched term", () => {
    const searchTerm = "vegan"
    cy.get("input").focus().type(searchTerm)
    cy.findByText(/your search/i).should("include.text", searchTerm)
    cy.findAllByTestId("postPreview__container").should("be.visible")
    cy.checkA11y()
  })
  it("types unmatched term", () => {
    const searchTerm = "botox"
    cy.get("input").focus().type(searchTerm)
    cy.findByText(/your search/i)
      .parent()
      .should("include.text", "Try searching for something else")
    cy.findAllByTestId("postPreview__container").should("not.be.visible")
    cy.checkA11y()
  })
  it.only("closes after click on post", () => {
    cy.findAllByTestId("postPreview__link").first().click()
    cy.findAllByTestId("postPreview__link").should("have.length", 0)
  })
  it("closes with close button", () => {
    cy.findByTestId("searchInput__closeButton").click()
    cy.findByText(/search/i).should("not.exist")
  })
})
