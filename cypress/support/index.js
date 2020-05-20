import "./commands"
import "cypress-axe"
import "@testing-library/cypress/add-commands"
import { configure } from "@testing-library/cypress"
configure({ testIdAttribute: "data-test-id" })
import "gatsby-cypress/commands"
