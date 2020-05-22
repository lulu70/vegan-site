/// <reference types="cypress" />
import ingredientsObject from "../../content/ingredients"
import random from "lodash.random"
const ingredients = Object.keys(ingredientsObject).map(
  key => ingredientsObject[key]
)
const randomNumber = random(0, ingredients.length)
// const randomIngredient = ingredients[randomNumber]
const randomIngredient = "tomato"
describe("Pantry", () => {
  beforeEach(() => {
    cy.visit("/the-vegan-pantry")
  })
  it("test pantry", () => {
    // cy.get("input").type(randomIngredient)
    cy.get("input").type(randomIngredient)
    cy.findByTestId("pantryIngredients__container")
      .should("include.text", randomIngredient)
      .findByText(randomIngredient)
      .click()
    cy.findByTestId("postPreview__container")
  })
})
