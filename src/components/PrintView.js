import React from "react"
import styled from "styled-components"
import { SECOND_COLOR } from "../constants"
import Image from "../components/Image"
import NutritionValues from "./NutritionValues"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

const Container = styled.div`
  border: dashed 1px ${SECOND_COLOR};
  padding: 1rem;
`
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: dashed 1px;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
`
const TopColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledImage = styled(Image)`
  width: 80px;
  height: 80px;
`
const PrintView = ({ fileName }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "recipes" } }) {
        nodes {
          name
          childMdx {
            frontmatter {
              title
              nutritionValues {
                title
                cal
                protein
                carbs
                fat
              }
              featuredImage {
                src {
                  name
                }
              }
            }
          }
        }
      }
      printView: allFile(filter: { sourceInstanceName: { eq: "printViews" } }) {
        nodes {
          name
          childMdx {
            body
          }
        }
      }
    }
  `)
  const post = data.allFile.nodes.find(({ name }) => name === fileName).childMdx
  const printView = data.printView.nodes.find(({ name }) => name === fileName)
    .childMdx
  return (
    <Container>
      <TopRow>
        <TopColumn>
          <h2>{post.frontmatter.title}</h2>
          <NutritionValues
            values={{
              cal: post.frontmatter.nutritionValues.cal,
              protein: post.frontmatter.nutritionValues.protein,
              carbs: post.frontmatter.nutritionValues.carbs,
              fat: post.frontmatter.nutritionValues.fat,
            }}
            title={post.frontmatter.nutritionValues.title}
          />
        </TopColumn>
        <StyledImage filename={post.frontmatter.featuredImage.src.name} />
      </TopRow>
      <MDXRenderer>{printView.body}</MDXRenderer>
    </Container>
  )
}

export default PrintView
