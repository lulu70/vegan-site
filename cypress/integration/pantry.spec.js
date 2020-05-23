import ingredients from "../../content/ingredients"
import random from "lodash.random"
const ingredientsArray = Object.keys(ingredients)
  .map(key => ingredients[key])
  .sort()

const randomIngredient = () => {
  const randomNumber = random(0, ingredientsArray.length - 1)
  return ingredientsArray[randomNumber]
}

describe("Pantry", () => {
  beforeEach(() => {
    cy.visit("/the-vegan-pantry")
  })

  it("all items exist", () => {
    cy.findAllByTestId("pantryIngredients__container")
      .find("li")
      .should("have.length", ingredientsArray.length)
    cy.findByTestId("pantryMenu__allItems")
      .find("span")
      .should("have.text", ingredientsArray.length)
  })

  it("type in search and clear it", () => {
    cy.get("input")
      .type("test typing")
      .should("have.value", "test typing")
    cy.findAllByTestId("pantry-input__icon").click()
    cy.get("input").should("have.value", "")
  })

  it("type three times two first chars of an item and check if it exists in filtered items", () => {
    const ingredient = randomIngredient()
    for (let i = 0; i < 3; i++) {
      cy.get("input").type(ingredient.slice(0, 2))
      cy.findByTestId("pantryIngredients__container").should(
        "include.text",
        ingredient
      )
      cy.get("input").clear()
    }
  })

  it("scrolling", () => {
    const firstItem = ingredientsArray[0]
    const lastItem = ingredientsArray[ingredientsArray.length - 1]
    cy.findByTestId("pantryIngredients__container").within(() => {
      cy.findByText(firstItem).should("be.visible")
      cy.findByText(lastItem).should("not.be.visible")
      cy.get(".ScrollbarsCustom-Scroller").scrollTo("bottom")
      cy.findByText(firstItem).should("not.be.visible")
      cy.findByText(lastItem).should("be.visible")
      cy.findByText(ingredientsArray[0]).should("not.be.visible")
    })
  })

  it("click on item integration", () => {
    const ingredient = randomIngredient()
    cy.findByTestId("pantry-ingredients__tickIcon").should("not.exist")
    cy.findByTestId("pantryIngredients__container")
      .findByText(ingredient)
      .click()
    cy.findByTestId("pantry-ingredients__tickIcon").should("exist")
    cy.findByTestId("pantrySelectedIngredients__container")
      .findByText(ingredient)
      .as("selectedItem")
      .should("have.length", 1)
    cy.findByTestId("pantryMenu__selectedItems")
      .find("span")
      .as("selectedItemsInMenu")
      .should("have.text", 1)
    cy.findByTestId("pantryMenu__matchedRecipes")
      .find("span")
      .as("matchedRecipesInMenu")
      .should("not.have.text", 0)

    cy.findByTestId("pantryRecipes__container")
      .findAllByTestId("postPreview__container")
      .should("have.length.greaterThan", 0)
    cy.get("@selectedItem")
      .click()
      .should("not.exist")
    cy.findByTestId("pantry-ingredients__tickIcon").should("not.exist")
    cy.get("@selectedItemsInMenu").should("have.text", 0)
    cy.get("@matchedRecipesInMenu").should("have.text", 0)
  })

  it("click on a recipe and navigate to it", () => {
    const ingredient = randomIngredient()
    cy.findByTestId("pantryIngredients__container")
      .findByText(ingredient)
      .click()
    cy.findByTestId("pantryRecipes__container")
      .findAllByTestId("postPreview__container")
      .first()
      .click()
    cy.url().should("include", "/recipes/")
  })
})
