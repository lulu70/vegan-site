import { Link } from "gatsby"
import styled from "styled-components"
import { SECOND_COLOR } from "../constants"
const StyledLink = styled(Link)`
  box-shadow: none;
  color: ${({ fontColor }) => fontColor || SECOND_COLOR};
  font-weight: bold;
`
export default StyledLink
