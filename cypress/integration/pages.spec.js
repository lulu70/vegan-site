/// <reference types="cypress" />
import random from "lodash.random"

describe("Pages loading", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Home page is loaded", () => {
    cy.url().should("exist")
    cy.get("h1").should("be.visible")
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

  it.only("One random recipe page is loaded", () => {
    cy.findAllByText(/recipes/i)
      .first()
      .click()
    cy.findAllByTestId("postPreview__header").then((headers) => {
      const randomNumber = random(0, headers.length - 1)
      const randomHeaderText = headers.eq(randomNumber).text()
      cy.findAllByText(randomHeaderText).first().click()
      cy.findByTestId("postHeader__h1").should("be.visible")
      cy.findByTestId("postHeader__description").should("be.visible")
      cy.findByTestId("postHeader__date")
        .should("be.visible")
        .invoke("text")
        .and("have.length.greaterThan", 1)
      cy.get("img").should("have.length.greaterThan", 1)
      cy.findAllByTestId("relatedPosts__ul").should(
        "not.contain.text",
        randomHeaderText
      )
      cy.findByTestId("printView__printLink").click()
      cy.url().should("include", "app/print")
    })
  })
})
