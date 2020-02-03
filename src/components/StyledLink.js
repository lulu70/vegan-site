import { Link } from "gatsby"
import styled from "styled-components"

const StyledLink = styled(Link)`
  box-shadow: none;
  color: ${props => props.color};
`
export default StyledLink
