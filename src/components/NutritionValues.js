import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { upperCase } from "../utils/helpers"
import styled from "styled-components"
import { SMALL_FONT_SIZE } from "../constants"

const Container = styled.div`
  font-size: ${SMALL_FONT_SIZE};
  margin-bottom: 0.5rem;
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
  const keys = Object.keys(nutritionValues).filter((key) => key !== "title")
  return (
    <Container>
      {!noTitle && (
        <div>
          {title || nutritionValues["title"] || "Nutrition values per serving:"}
        </div>
      )}
      {keys.map((key, index) => {
        const value = nutritionValues[key]
        const hasNextValue = nutritionValues[keys[index + 1]]
        if (!value) return null
        return (
          <React.Fragment key={key}>
            <span>
              <strong>{upperCase(key)}: </strong>
              {value}
            </span>
            {hasNextValue && " | "}
          </React.Fragment>
        )
      })}
    </Container>
  )
}

export default NutritionValues
