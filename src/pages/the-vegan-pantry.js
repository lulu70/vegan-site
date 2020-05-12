import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { graphql } from "gatsby"
import PantryIngredients from "../components/PantryIngredients"
import PantryRecipes from "../components/PantryRecipes"
import { MAIN_COLOR } from "../constants"
import PantryMenu from "../components/PantryMenu"
import SEO from "../components/seo"
import recipesIngredients from "../../content/recipesIngredients"
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${MAIN_COLOR};
  flex: 1;
  padding-top: 1rem;
  margin-bottom: 1rem;
`
const H1 = styled.h1`
  text-align: center;
`

const Section = styled.section`
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
      <Container>
        <H1>Add Ingredients ang get recipes</H1>
        <PantryMenu />
        <Section>
          <PantryIngredients recipes={recipesWithIngredients} />
          <PantryRecipes />
        </Section>
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
