import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { graphql } from "gatsby"
import PantryIngredients from "../components/PantryIngredients"
import PantryRecipes from "../components/PantryRecipes"
import { MAIN_COLOR } from "../constants"
import PantryMenu from "../components/PantryMenu"
import SEO from "../components/seo"
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

  return (
    <Layout full location={location}>
      <SEO title="The vegan pantry" />
      <Container>
        <H1>Add Ingredients ang get recipes</H1>
        <PantryMenu />
        <Section>
          <PantryIngredients recipes={recipes} />
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
