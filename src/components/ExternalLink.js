import React from "react"
import styled from "styled-components"
import { SECOND_COLOR } from "../constants"

const A = styled.a`
  box-shadow: none;
  color: ${({ color }) => color || SECOND_COLOR};
  font-weight: bold;
`
const ExternalLink = ({ to, children, ...rest }) => {
  return (
    <A {...rest} target="_blank" rel="noreferrer" href={to}>
      {children}
    </A>
  )
}

export default ExternalLink
