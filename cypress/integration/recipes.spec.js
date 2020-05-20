/// <reference types="cypress" />

describe("Recipes", () => {
  beforeEach(() => {
    cy.visit("/recipes")
    cy.waitForRouteChange()
  })
  it("Recipes have no detectable accessibility violations on load", () => {
    cy.findAllByTestId("postPreview__link").each(link => {
      const href = link.attr("href")
      cy.visit(href)
      cy.waitForRouteChange().injectAxe()
      cy.checkA11y()
    })
  })
  it("Recipes have headers", () => {
    cy.findAllByTestId("postPreview__link").each(link => {
      const href = link.attr("href")
      cy.visit(href)
      cy.waitForRouteChange().injectAxe()
      cy.get("h1").should("be.visible")
      cy.checkA11y()
    })
  })
  it("Recipes have dates", () => {
    cy.findAllByTestId("postPreview__link").each(link => {
      const href = link.attr("href")
      cy.visit(href)
      cy.waitForRouteChange().injectAxe()
      cy.findByTestId("blogPostTemplate__date")
        .should("be.visible")
        .invoke("text")
        .and("have.length.greaterThan", 1)
      cy.checkA11y()
    })
  })
  it("Recipes have images", () => {
    cy.findAllByTestId("postPreview__link").each(link => {
      const href = link.attr("href")
      cy.visit(href)
      cy.waitForRouteChange().injectAxe()
      cy.get("img").should("have.length.greaterThan", 1)
      cy.checkA11y()
    })
  })
})
