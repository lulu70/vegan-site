import React from "react"
import BackgroundImage from "gatsby-background-image"
import { useStaticQuery } from "gatsby"

const BgImg = ({ children, img }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "bgImg" } }) {
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
  const edge = data.allFile.edges.find(({ node }) => node.name === img)
  const fluid = edge ? edge.node.childImageSharp.fluid : null
  return fluid ? (
    <BackgroundImage Tag="section" fluid={fluid} backgroundColor={`white`}>
      {children}
    </BackgroundImage>
  ) : (
    children
  )
}

export default BgImg
