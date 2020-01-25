import React from "react"
import GatsbyImage from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Image = ({ name, ...props }) => {
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

  const edge = data.allFile.edges.find(({ node }) => node.name === name)

  return edge ? (
    <GatsbyImage fluid={edge.node.childImageSharp.fluid} {...props} />
  ) : (
    <h1 style={{ color: "red" }}>
      <strong>Cant find the image...</strong>
    </h1>
  )
}

export default Image
