import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"
import { rhythm } from "../utils/typography"
import styled from "styled-components"
import { MAIN_COLOR } from "../constants"

const Container = styled.div`
  display: flex;
  margin-top: ${rhythm(1)};
  margin-bottom: ${rhythm(1)};
`
const StyledImage = styled(GatsbyImage)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: 50;
  border-radius: 100%;
`
const StyledP = styled.p`
  color: ${MAIN_COLOR};
`
const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <Container>
      <StyledImage
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <StyledP>
        Written by <strong>{author}</strong>.
      </StyledP>
    </Container>
  )
}

export default Bio
