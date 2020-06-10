/// <reference types="cypress" />

describe("Main menu is loading correctly", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Main menu page is loaded", () => {
    cy.get("nav").find("ul").find("li").should("have.length", 2)
  })
})
