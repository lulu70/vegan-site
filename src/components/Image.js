import React from "react"
import GatsbyImage from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Image = ({ fileName, small, style, ...props }) => {
  const data = useStaticQuery(graphql`
    query ImageQuery {
      allFile {
        edges {
          node {
            name
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

  const edge = data.allFile.edges.find(({ node }) => node.name === fileName)

  return edge ? (
    <GatsbyImage
      fluid={edge.node.childImageSharp.fluid}
      {...props}
      alt={fileName}
      style={{ width: small ? "250px" : "", ...style }}
    />
  ) : (
    <p style={{ color: "red" }}>
      <strong>No image found...</strong>
    </p>
  )
}

export default Image
