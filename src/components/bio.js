import React from "react"
import styled from "styled-components"
import { MAIN_COLOR, MAIN_FONT_SIZE } from "../constants"
import GatsbyImage from "gatsby-image"
const Container = styled.div`
  display: flex;
  font-size: ${MAIN_FONT_SIZE};
`
const StyledImage = styled(GatsbyImage)`
  margin-bottom: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
`
const StyledP = styled.p`
  color: ${MAIN_COLOR};
`
const Bio = ({ author }) => {
  return (
    <Container>
      <StyledImage
        fluid={author.image.childImageSharp.fluid}
        title={author.image.name}
        alt={author.image.name}
      />
      <StyledP>
        Written by <strong>{author.title}</strong>.
      </StyledP>
    </Container>
  )
}

export default Bio
