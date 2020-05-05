import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { graphql } from "gatsby"
import PantryIngredients from "../components/PantryIngredients"
import PantrySelectedIngredients from "../components/PantrySelectedIngredients"
import PantryRecipes from "../components/PantryRecipes"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  input {
    margin-bottom: 1rem;
  }
  .inner {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .ingredients-list {
    height: 50vh;
    overflow-y: scroll;
  }
`
const TheVeganPantry = ({ location, data }) => {
  const recipes = data.allFile.nodes
  return (
    <Layout full location={location}>
      <Container>
        <h1>The Vegan Pantry</h1>
        <div className="inner">
          <PantryIngredients recipes={recipes} />
          <PantrySelectedIngredients recipes={recipes} />
          <PantryRecipes />
        </div>
      </Container>
    </Layout>
  )
}

export default TheVeganPantry

export const pageQuery = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "recipes" } }) {
      nodes {
        childMdx {
          id
          frontmatter {
            ingredients
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
