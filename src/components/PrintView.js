import React from "react"
import styled from "styled-components"
import {
  SECOND_COLOR,
  MEDIUM_HEADER_SIZE,
  SMALL_HEADER_SIZE,
  SMALL_FONT_SIZE,
  MAIN_FONT_SIZE,
  GREY,
} from "../constants"
import NutritionValues from "./NutritionValues"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import GatsbyImage from "gatsby-image"
import PrintSvg from "../../content/assets/print.svg"

const Container = styled.div`
  font-size: ${MAIN_FONT_SIZE};
  border: dashed 1px ${SECOND_COLOR};
  padding: 1rem;
  ul,
  ol {
    padding: 0;
    margin: 0 0 1rem 1rem;
  }
  li {
    margin: 0;
    padding: 0;
  }
  h2 {
    font-size: ${MEDIUM_HEADER_SIZE};
    margin: 0 0 0.5rem 0;
  }
  h3 {
    font-size: ${SMALL_HEADER_SIZE};
    margin: 0 0 0.5rem 0;
  }
  h4 {
    font-size: ${SMALL_FONT_SIZE};
    margin: 0 0 0.5rem 0;
  }
  p {
    margin-bottom: 1rem;
  }
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
const PrintLink = styled.a`
  width: 60px;
  color: ${SECOND_COLOR};
  background-color: ${GREY};
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`
const StyledImage = styled(GatsbyImage)`
  width: 128px;
  height: 72px;
`
const PrintView = ({ fileName, noPrintButton, setImageLoaded }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "recipes" } }) {
        nodes {
          name
          childMdx {
            frontmatter {
              title
              nutritionValues {
                servingsText
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
  const matchedPost = data.allFile.nodes.find(({ name }) => name === fileName)
  const matchedPrintView = data.printView.nodes.find(
    ({ name }) => name === fileName
  )
  if (!matchedPost || !matchedPrintView) {
    return <span />
  }

  const post = matchedPost.childMdx
  const printView = matchedPrintView.childMdx
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
            servingsText={post.frontmatter.nutritionValues.servingsText}
          />
          {!noPrintButton && (
            <PrintLink
              href={`/app/print/${fileName}`}
              target="_blank"
              rel="noreferrer"
              data-test-id="printView__printLink"
            >
              Print
              <PrintSvg />
            </PrintLink>
          )}
        </TopColumn>
        <StyledImage
          fluid={post.frontmatter.images[0].childImageSharp.fluid}
          title={post.frontmatter.images[0].name}
          alt={post.frontmatter.images[0].name}
          onLoad={() => {
            if (setImageLoaded) setImageLoaded(true)
          }}
        />
      </TopRow>
      <MDXRenderer>{printView.body}</MDXRenderer>
    </Container>
  )
}

export default PrintView
