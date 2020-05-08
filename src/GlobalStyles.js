import { createGlobalStyle } from "styled-components"
import { MAIN_COLOR, SECOND_COLOR } from "./constants"
const GlobalStyles = createGlobalStyle`
  * {
    outline-color:${SECOND_COLOR};
  }
  body {
    font-Weight: lighter;
    font-Family: Sans-Serif;
  }
  h1, h2, h3, h4, h5, h6  {
    font-Weight: lighter;
    font-Family: Sans-Serif; 
    margin-top: 1rem;
    color: ${MAIN_COLOR};
  }
  .gatsby-resp-image-link {
    box-shadow:none;
  }
  a {
    box-shadow: none;
  }
  ul,ol, blockquote {
    padding-left: 1rem;
    margin-left: 0;
  }

`
export default GlobalStyles
