import { Link } from "gatsby"
import styled from "styled-components"
import { MAIN_COLOR } from "../constants"
const StyledLink = styled(Link)`
  box-shadow: none;
  color: ${({ color }) => color || MAIN_COLOR};
`
export default StyledLink
