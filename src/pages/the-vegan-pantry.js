import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { graphql } from "gatsby"
import PantryIngredients from "../components/PantryIngredients"
import PantryRecipes from "../components/PantryRecipes"
import PantryMenu from "../components/PantryMenu"
import SEO from "../components/seo"
import recipesIngredients from "../../content/recipesIngredients"
import PantrySelectedIngredients from "../components/PantrySelectedIngredients"
import PantryInput from "../components/PantryInput"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding-top: 1rem;
  margin-bottom: 1rem;
`
const TopSection = styled.section`
  display: flex;
  width: 100%;
  height: 10rem;
  margin-bottom: 1rem;
`

const SecondSection = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 20rem;
`
const TheVeganPantry = ({ location, data }) => {
  const recipes = data.allFile.nodes

  const recipesWithIngredients = recipes.reduce((acc, recipe) => {
    const name = recipe.name
    const key = Object.keys(recipesIngredients).find(key => key === name)
    const ingredients = recipesIngredients[key]
    return [...acc, { ...recipe, ingredients }]
  }, [])

  return (
    <Layout full location={location}>
      <SEO title="The vegan pantry" />
      <Container data-testing="the-vegan-pantry__container">
        <PantryMenu />
        <PantryInput />
        <TopSection>
          <PantryIngredients recipes={recipesWithIngredients} />
          <PantrySelectedIngredients />
        </TopSection>
        <SecondSection>
          <PantryRecipes />
        </SecondSection>
      </Container>
    </Layout>
  )
}

export default TheVeganPantry

export const pageQuery = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "recipes" } }) {
      nodes {
        name
        childMdx {
          id
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
            updatedDate(formatString: "MMMM DD, YYYY")
            nutritionValues {
              cal
              protein
              carbs
              fat
            }
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
