/// <reference types="cypress" />
import recipesIngredients from "../../content/recipesIngredients"
const recipes = Object.keys(recipesIngredients)

describe("Search working", () => {
  beforeEach(() => {
    cy.visit("/")
      .get("main")
      .injectAxe()
      .wait(500)
    cy.findByTestId("header__searchIcon").click()
  })
  it("loads", () => {
    cy.findByText(/search/i).should("be.visible")
    cy.findByTestId("searchInput__closeButton").should("be.visible")
    cy.get("input").should("be.visible")
    cy.findAllByTestId("postPreview__container").should(
      "have.length",
      recipes.length
    )
  })
  it("types matched term", () => {
    const searchTerm = "vegan"
    cy.get("input")
      .focus()
      .type(searchTerm)
    cy.findByText(/your search/i).should("include.text", searchTerm)
    cy.findAllByTestId("postPreview__container").should("be.visible")
  })
  it("types unmatched term", () => {
    const searchTerm = "botox"
    cy.get("input")
      .focus()
      .type(searchTerm)
    cy.findByText(/your search/i)
      .parent()
      .should("include.text", "Try searching for something else")
    cy.findAllByTestId("postPreview__container").should("not.be.visible")
  })
  it("navigates to post page", () => {
    cy.findByText(/home-made pita/i).click()
    cy.url().should("contain", "home-made-pita")
  })
  it("close", () => {
    cy.findByTestId("searchInput__closeButton").click()
    cy.findByText(/search/i).should("not.exist")
  })
})
