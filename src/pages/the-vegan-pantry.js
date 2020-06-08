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
import PostHeader from "../components/PostHeader"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const Content = styled.div`
  padding: 1rem 1rem 0 1rem;
  @media (max-width: 900px) {
    padding: 1rem 0 0 0;
  }
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
const TheVeganPantry = ({ data }) => {
  const recipes = data.allFile.nodes

  const recipesWithIngredients = recipes.reduce((acc, recipe) => {
    const name = recipe.name
    const key = Object.keys(recipesIngredients).find((key) => key === name)
    const ingredients = recipesIngredients[key]
    return [...acc, { ...recipe, ingredients }]
  }, [])

  return (
    <Layout>
      <SEO title="The vegan pantry" />
      <Container data-test-id="the-vegan-pantry__container">
        <PostHeader title="The vegan pantry" />
        <Content>
          <PantryMenu />
          <PantryInput />
          <TopSection>
            <PantryIngredients recipes={recipesWithIngredients} />
            <PantrySelectedIngredients />
          </TopSection>
          <SecondSection>
            <PantryRecipes />
          </SecondSection>
        </Content>
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
            nutritionalValues {
              title
              cal
              protein
              carbs
              fat
            }
            images {
              name
              childImageSharp {
                fluid(maxWidth: 500, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
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
