import React from "react"
import GatsbyImage from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const StyledImage = styled(GatsbyImage)`
  width: ${props => (props.small ? "250px" : "")};
`
const Error = styled.p`
  color: red;
`
const Image = ({ avatar, fileName, small, style, ...props }) => {
  const data = useStaticQuery(graphql`
    query ImageQuery {
      allFile {
        edges {
          node {
            name
            childImageSharp {
              fixed(width: 50, height: 50) {
                ...GatsbyImageSharpFixed_tracedSVG
              }
              fluid {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  `)

  const edge = data.allFile.edges.find(({ node }) => node.name === fileName)

  return edge ? (
    avatar ? (
      <StyledImage
        fixed={edge.node.childImageSharp.fixed}
        {...props}
        alt={fileName}
        style={{ ...style }}
      />
    ) : (
      <StyledImage
        fluid={edge.node.childImageSharp.fluid}
        {...props}
        alt={fileName}
        small={small}
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
