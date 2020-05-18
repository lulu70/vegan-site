import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { upperCase } from "../utils/helpers"
const NutritionValues = ({ values, fileName }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "recipes" } }) {
        nodes {
          name
          childMdx {
            frontmatter {
              nutritionValues {
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
  const keys = Object.keys(nutritionValues)
  return (
    <p>
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
    </p>
  )
}

export default NutritionValues