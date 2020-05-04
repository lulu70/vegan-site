import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { graphql } from "gatsby"
import StyledLink from "../components/StyledLink"
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
  const allIngredients = recipes.reduce((acc, recipe) => {
    const ingredients = recipe.childMdx.frontmatter.ingredients
    if (ingredients) return [...acc, ...ingredients]
    return acc
  }, [])
  const uniqueIngredients = allIngredients.filter(
    (ingredient, index) => allIngredients.indexOf(ingredient) === index
  )

  const [filterInput, setFilterInput] = React.useState("")
  const [filteredIngredients, setFilteredIngredients] = React.useState(
    uniqueIngredients
  )
  const [filteredRecipes, setFilteredRecipes] = React.useState([])
  const [selectedIngredients, setSelectedIngredients] = React.useState([])

  React.useEffect(() => {
    const filtered = recipes.filter(recipe => {
      const recipeIngredients = recipe.childMdx.frontmatter.ingredients
      const hasAllSelectedIngredients = selectedIngredients.every(selected =>
        recipeIngredients.includes(selected)
      )
      if (selectedIngredients.length < 1) return false
      return hasAllSelectedIngredients
    })
    setFilteredRecipes(filtered)
  }, [selectedIngredients, recipes])

  const handleInputChange = e => {
    setFilterInput(e.target.value)
    const filtered = uniqueIngredients.filter(ingredient =>
      ingredient.includes(e.target.value.toLowerCase())
    )
    setFilteredIngredients(filtered)
  }

  const handleIngredientClick = ingredient => {
    const isUniqueIngredient = !selectedIngredients.includes(ingredient)
    setSelectedIngredients(state => {
      if (!isUniqueIngredient) return state
      return [...state, ingredient]
    })
  }

  const handleRemoveSelectedIngredient = index => {
    setSelectedIngredients(state => [
      ...state.slice(0, index),
      ...state.slice(index + 1),
    ])
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
