import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { SMALL_FONT_SIZE } from "../constants"

const Container = styled.div`
  font-size: ${SMALL_FONT_SIZE};
  margin-bottom: 0.5rem;
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`
const Span = styled.span`
  padding: 0 0.2rem;
  border-right: ${(props) => (props.noBorder ? "none" : "solid 1px")};
  @media (max-width: 600px) {
    :last-child {
      border-right: none;
    }
  }
`
const NutritionValues = ({ values, title, fileName, noTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "recipes" } }) {
        nodes {
          name
          childMdx {
            frontmatter {
              nutritionValues {
                title
                cal
                protein
                carbs
                fat
              }
            }
          }
        }
      }
    }
  `)
  let nutritionValues
  if (fileName) {
    const matchedRecipe = data.allFile.nodes.find(
      ({ name }) => name === fileName
    )
    nutritionValues = matchedRecipe.childMdx.frontmatter.nutritionValues
  }
  if (values) {
    nutritionValues = values
  }
  return (
    <Container>
      {!noTitle && (
        <div>
          {title || nutritionValues["title"] || "Nutrition values per serving:"}
        </div>
      )}
      <div>
        <Span>
          <strong>cal: </strong>
          {nutritionValues.cal}
        </Span>
        <Span>
          <strong>protein: </strong>
          {nutritionValues.protein}
        </Span>
      </div>
      <div>
        <Span>
          <strong> carbs: </strong>
          {nutritionValues.carbs}
        </Span>
        <Span noBorder>
          <strong>fat: </strong>
          {nutritionValues.fat}
        </Span>
      </div>
    </Container>
  )
}

export default NutritionValues
