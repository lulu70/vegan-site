import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { graphql } from "gatsby"
import StyledLink from "../components/StyledLink"
import { usePantryDispatch, usePantryState } from "../context/ContextProvider"
import {
  setIngredients,
  setFilteredIngredients,
  setFilterInput,
  setSelectedIngredients,
  setFilteredRecipes,
} from "../context/reducers/pantryReducer"
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

  const pantryDispatch = usePantryDispatch()
  const {
    ingredients,
    filteredIngredients,
    filterInput,
    selectedIngredients,
    filteredRecipes,
  } = usePantryState()

  React.useEffect(() => {
    const allIngredients = recipes.reduce((acc, recipe) => {
      const ingredients = recipe.childMdx.frontmatter.ingredients
      if (ingredients) return [...acc, ...ingredients]
      return acc
    }, [])

    const uniqueIngredients = allIngredients
      .filter(
        (ingredient, index) => allIngredients.indexOf(ingredient) === index
      )
      .map(word => word.toLowerCase())
      .sort()

    setIngredients(pantryDispatch, uniqueIngredients)
    setFilteredIngredients(pantryDispatch, uniqueIngredients)
  }, [pantryDispatch, recipes])

  React.useEffect(() => {
    const filtered = recipes.filter(recipe => {
      const recipeIngredients = recipe.childMdx.frontmatter.ingredients.map(
        ingredient => ingredient.toLowerCase()
      )
      const hasAllSelectedIngredients = selectedIngredients.every(selected =>
        recipeIngredients.includes(selected)
      )
      if (selectedIngredients.length < 1) return false
      return hasAllSelectedIngredients
    })
    setFilteredRecipes(pantryDispatch, filtered)
  }, [selectedIngredients, recipes, pantryDispatch])

  const handleInputChange = e => {
    setFilterInput(pantryDispatch, e.target.value)
    const filtered = ingredients.filter(ingredient =>
      ingredient.includes(e.target.value.toLowerCase())
    )
    setFilteredIngredients(pantryDispatch, filtered)
  }

  const handleIngredientClick = ingredient => {
    const isUniqueIngredient = !selectedIngredients.includes(ingredient)
    if (isUniqueIngredient)
      setSelectedIngredients(pantryDispatch, [
        ...selectedIngredients,
        ingredient,
      ])
  }

  const handleRemoveSelectedIngredient = index => {
    const newIngredients = [
      ...selectedIngredients.slice(0, index),
      ...selectedIngredients.slice(index + 1),
    ]
    setSelectedIngredients(pantryDispatch, newIngredients)
  }
  return (
    <Layout full location={location}>
      <Container>
        <h1>The Vegan Pantry</h1>
        <div className="inner">
          <div>
            <h2>Ingredients</h2>
            <input value={filterInput} onChange={handleInputChange} />
            <ul className="ingredients-list">
              {filteredIngredients.map(ingredient => (
                <li key={ingredient}>
                  <button onClick={() => handleIngredientClick(ingredient)}>
                    {ingredient}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Selected Ingredients</h2>
            <ul>
              {selectedIngredients.map((ingredient, index) => (
                <li key={ingredient}>
                  <div>
                    {ingredient}
                    <button
                      onClick={() => {
                        handleRemoveSelectedIngredient(index)
                      }}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Recipes</h2>
            <ul>
              {filteredRecipes.map(recipe => (
                <li key={recipe.childMdx.id}>
                  <StyledLink to={recipe.childMdx.fields.slug}>
                    {recipe.childMdx.frontmatter.title}
                  </StyledLink>
                </li>
              ))}
            </ul>
          </div>
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
