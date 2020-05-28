import React from "react"
import styled from "styled-components"
import { SECOND_COLOR } from "../constants"
import Image from "../components/Image"
import NutritionValues from "./NutritionValues"
import { useStaticQuery, graphql } from "gatsby"

const Container = styled.div`
  border: dashed 1px ${SECOND_COLOR};
  padding: 1rem;
`
const Header = styled.h2`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
`
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`
const TopColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledImage = styled(Image)`
  width: 80px;
  height: 80px;
`
const IngredientsList = styled.ul`
  margin: 0;
  padding: 0;
`
const Ingredient = styled.li`
  margin: 0;
  padding: 0;
  font-size: 0.7rem;
  list-style: inside;
`
const PrintView = ({ post, children }) => {
  //   const data = useStaticQuery(graphql`
  //     query {
  //       allFile(filter: { sourceInstanceName: { eq: "recipes" } }) {
  //         nodes {
  //           name
  //           childMdx {
  //             frontmatter {
  //               title
  //               ingredients
  //               nutritionValues {
  //                 cal
  //                 protein
  //                 carbs
  //                 fat
  //               }
  //               featuredImage {
  //                 src {
  //                   name
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `)
  //   const post = data.allFile.nodes.find(({ name }) => name === fileName).childMdx
  return (
    <Container>
      <TopRow>
        <TopColumn>
          <Header>{post.frontmatter.title}</Header>
          <NutritionValues
            values={{
              cal: post.frontmatter.nutritionValues.cal,
              protein: post.frontmatter.nutritionValues.protein,
              carbs: post.frontmatter.nutritionValues.carbs,
              fat: post.frontmatter.nutritionValues.fat,
            }}
          />
        </TopColumn>
        <StyledImage filename={post.frontmatter.featuredImage.src.name} />
      </TopRow>
      {children}
      <IngredientsList>
        <Header>Ingredients</Header>
        {post.frontmatter.ingredients.map((ingredient, index) => (
          <Ingredient key={index}>{ingredient}</Ingredient>
        ))}
      </IngredientsList>
    </Container>
  )
}

export default PrintView
