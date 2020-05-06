import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { graphql } from "gatsby"
import PantryIngredients from "../components/PantryIngredients"
import PantryRecipes from "../components/PantryRecipes"
import { MAIN_COLOR } from "../constants"
import { usePantryState, usePantryDispatch } from "../context/ContextProvider"
import { setShowSelectedIngredients } from "../context/reducers/pantryReducer"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${MAIN_COLOR};
  flex: 1;
  h1 {
    text-align: center;
  }
  .the-vegan-pantry__menu {
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    font-size: 0.9rem;
  }
  .the-vegan-pantry__divider {
    border: solid 1px;
    height: 1.5rem;
    margin: 0 0.2rem;
  }
  .the-vegan-pantry__button {
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    :disabled {
      cursor: initial;
      color: grey;
    }
  }
`
const Main = styled.main`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const TheVeganPantry = ({ location, data }) => {
  const recipes = data.allFile.nodes
  const { selectedIngredients, ingredients } = usePantryState()
  const pantryDispatch = usePantryDispatch()
  return (
    <Layout full location={location}>
      <Container>
        <h1>The Vegan Pantry</h1>
        <div className="the-vegan-pantry__menu">
          <button
            className="the-vegan-pantry__button"
            onClick={() => {
              setShowSelectedIngredients(pantryDispatch, false)
            }}
          >
            All items: {ingredients.length}
          </button>
          <div className="the-vegan-pantry__divider" />
          <button
            className="the-vegan-pantry__button"
            disabled={selectedIngredients.length < 1}
            onClick={() => {
              setShowSelectedIngredients(pantryDispatch, true)
            }}
          >
            Selected items: {selectedIngredients.length}
          </button>
        </div>
        <Main>
          <PantryIngredients recipes={recipes} />
          <PantryRecipes />
        </Main>
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
            description
            featuredImage {
              src {
                name
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
