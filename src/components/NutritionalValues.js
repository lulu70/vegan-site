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
    text-align: center;
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
const NutritionalValues = ({
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
              nutritionalValues {
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
  let nutritionalValues
  if (fileName) {
    const matchedRecipe = data.allFile.nodes.find(
      ({ name }) => name === fileName
    )
    nutritionalValues = matchedRecipe.childMdx.frontmatter.nutritionalValues
  }
  if (values) {
    nutritionalValues = values
  }
  return (
    <Container>
      {!noServingsText && (
        <ServingsContainer>
          <StyledDishSvg />
          <strong>{servingsText || nutritionalValues.servingsText}</strong>
        </ServingsContainer>
      )}
      {!noTitle && (
        <Title>
          {title ||
            nutritionalValues.title ||
            "Nutritional values per serving:"}
        </Title>
      )}
      <ValuesContainer>
        <div>
          <Span cal>
            <strong>cal: </strong>
            {nutritionalValues.cal}
          </Span>
          <Span>
            <strong>protein: </strong>
            {nutritionalValues.protein}
          </Span>
        </div>
        <div>
          <Span carbs>
            <strong> carbs: </strong>
            {nutritionalValues.carbs}
          </Span>
          <Span noBorder>
            <strong>fat: </strong>
            {nutritionalValues.fat}
          </Span>
        </div>
      </ValuesContainer>
    </Container>
  )
}

export default NutritionalValues
