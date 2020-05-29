import { Link } from "gatsby"
import styled from "styled-components"
import { SECOND_COLOR } from "../constants"
const StyledLink = styled(Link)`
  box-shadow: none;
  color: ${({ color }) => color || SECOND_COLOR};
`
export default StyledLink
