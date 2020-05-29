import React from "react"
import styled from "styled-components"
import { MAIN_COLOR, MAIN_FONT_SIZE } from "../constants"
import Image from "../components/Image"
const Container = styled.div`
  display: flex;
  font-size: ${MAIN_FONT_SIZE};
`
const StyledImage = styled(Image)`
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
