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

  it("Blog-page is loaded", () => {
    cy.findAllByText(/blog/i).first().click()
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

  it("One random recipe page is loaded", () => {
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
      cy.findByTestId("printView__printLink").then((el) => {
        const href = el.prop("href")
        cy.visit(href)
        cy.url().should("include", "app/print/")
      })
    })
  })
})
