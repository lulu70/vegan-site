import React from "react"
import { useStaticQuery, graphql } from "gatsby"
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
  const valuesKeys = Object.keys(nutritionValues)
  return (
    <p>
      {valuesKeys.map((key, index) => (
        <React.Fragment key={key}>
          <span>
            <strong>{key.slice(0, 1).toUpperCase() + key.slice(1)}: </strong>
            {nutritionValues[key]}
          </span>
          {index !== valuesKeys.length - 1 && " | "}
        </React.Fragment>
      ))}
    </p>
  )
}

export default NutritionValues
