import React from "react"
import { rhythm } from "../utils/typography"
import styled from "styled-components"
import { MAIN_COLOR } from "../constants"
import Image from "../components/Image"
const Container = styled.div`
  display: flex;
  margin-top: ${rhythm(1)};
  margin-bottom: ${rhythm(1)};
`
const StyledImage = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: 50;
  border-radius: 100%;
`
const StyledP = styled.p`
  color: ${MAIN_COLOR};
`
const Bio = ({ author }) => {
  return (
    <Container>
      <StyledImage filename={author.image.name} avatar />
      <StyledP>
        Written by <strong>{author.title}</strong>.
      </StyledP>
    </Container>
  )
}

export default Bio
