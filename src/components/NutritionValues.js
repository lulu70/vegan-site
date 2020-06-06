import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { SMALL_FONT_SIZE, TINY_FONT_SIZE, SECOND_COLOR } from "../constants"
import DishSvg from "../../content/assets/dish-spoon-knife.svg"
const Container = styled.div`
  font-size: ${SMALL_FONT_SIZE};
  margin-bottom: 0.5rem;
`
const ServingsContainer = styled.div`
  display: flex;
  align-items: center;
`
const StyledDishSvg = styled(DishSvg)`
  margin-right: 0.3rem;
  path {
    fill: ${SECOND_COLOR};
  }
`

const Title = styled.div`
  font-size: ${TINY_FONT_SIZE};
`
const ValuesContainer = styled.div`
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`
const Span = styled.span`
  padding-right: 0.2rem;
  padding-left: ${(props) => (props.cal ? "0" : "0.2rem")};
  border-right: ${(props) => (props.noBorder ? "none" : "solid 1px")};
  @media (max-width: 600px) {
    padding-left: ${(props) => (props.cal || props.carbs ? 0 : "0.2rem")};
    :last-child {
      border-right: none;
    }
  }
`
const NutritionValues = ({
  values,
  title,
  servingsText,
  fileName,
  noTitle,
  noServingsText,
}) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "recipes" } }) {
        nodes {
          name
          childMdx {
            frontmatter {
              nutritionValues {
                servingsText
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
      {!noServingsText && (
        <ServingsContainer>
          <StyledDishSvg />
          <strong>{servingsText || nutritionValues.servingsText}</strong>
        </ServingsContainer>
      )}
      {!noTitle && (
        <Title>
          {title || nutritionValues.title || "Nutrition values per serving:"}
        </Title>
      )}
      <ValuesContainer>
        <div>
          <Span cal>
            <strong>cal: </strong>
            {nutritionValues.cal}
          </Span>
          <Span>
            <strong>protein: </strong>
            {nutritionValues.protein}
          </Span>
        </div>
        <div>
          <Span carbs>
            <strong> carbs: </strong>
            {nutritionValues.carbs}
          </Span>
          <Span noBorder>
            <strong>fat: </strong>
            {nutritionValues.fat}
          </Span>
        </div>
      </ValuesContainer>
    </Container>
  )
}

export default NutritionValues
