import React from "react"
import GatsbyImage from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Image = ({ path, ...props }) => {
  const data = useStaticQuery(graphql`
    query ImageQuery {
      allFile {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)
  const { node } = data.allFile.edges.find(
    ({ node }) => node.relativePath === path
  )
  return node ? (
    <GatsbyImage fluid={node.childImageSharp.fluid} {...props} />
  ) : (
    <h1>Image</h1>
  )
}

export default Image
