import React from "react"
import GatsbyImage from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const StyledImage = styled(GatsbyImage)``
const Error = styled.p`
  color: red;
`
const Image = ({ avatar, filename, style, unlink, ...props }) => {
  const data = useStaticQuery(graphql`
    query ImageQuery {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            name
            childImageSharp {
              original {
                src
              }
              fixed(width: 50, height: 50) {
                ...GatsbyImageSharpFixed_withWebp_noBase64
              }
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  `)

  const edge = data.allFile.edges.find(({ node }) => node.name === filename)
  const fluidImage = (
    <StyledImage
      fluid={edge.node.childImageSharp.fluid}
      {...props}
      title={props.title || filename}
      alt={props.alt || filename}
      style={{ ...style }}
    />
  )
  const fixedImage = (
    <StyledImage
      fixed={edge.node.childImageSharp.fixed}
      {...props}
      title={props.title || filename}
      alt={props.alt || filename}
      style={{ ...style }}
    />
  )
  return edge ? (
    avatar ? (
      unlink ? (
        fixedImage
      ) : (
        <a
          target="_blank"
          rel="noreferrer"
          href={edge.node.childImageSharp.original.src}
        >
          {fixedImage}
        </a>
      )
    ) : unlink ? (
      fluidImage
    ) : (
      <a
        target="_blank"
        rel="noreferrer"
        href={edge.node.childImageSharp.original.src}
      >
        {fluidImage}
      </a>
    )
  ) : (
    <Error className="image__error">
      <strong>No image found...</strong>
    </Error>
  )
}

export default Image
