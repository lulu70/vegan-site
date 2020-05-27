import React from "react"
import GatsbyImage from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const StyledImage = styled(GatsbyImage)``
const Error = styled.p`
  color: red;
`
const Image = ({ avatar, filename, style, ...props }) => {
  const data = useStaticQuery(graphql`
    query ImageQuery {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            name
            childImageSharp {
              fixed(width: 50, height: 50) {
                ...GatsbyImageSharpFixed_withWebp_noBase64
              }
              fluid {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  `)
  const edge = data.allFile.edges.find(({ node }) => node.name === filename)
  return edge ? (
    avatar ? (
      <StyledImage
        fixed={edge.node.childImageSharp.fixed}
        {...props}
        title={props.title || filename}
        alt={props.alt || filename}
        style={{ ...style }}
      />
    ) : (
      <StyledImage
        fluid={edge.node.childImageSharp.fluid}
        {...props}
        title={props.title || filename}
        alt={props.alt || filename}
        style={{ ...style }}
      />
    )
  ) : (
    <Error className="image__error">
      <strong>No image found...</strong>
    </Error>
  )
}

export default Image
