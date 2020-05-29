import { createGlobalStyle } from "styled-components"
import { MAIN_COLOR, SECOND_COLOR, BG_COLOR } from "./constants"
const GlobalStyles = createGlobalStyle`
  * {
    :focus{
      outline-color:${SECOND_COLOR};  
      outline-style:solid;
      outline-width: 2px;
    }
  }
  html, body {
    font-Weight: lighter;
    font-Family: Sans-Serif;
    background-color: ${BG_COLOR};
  }
  h1, h2, h3, h4, h5, h6  {
    font-Weight: lighter;
    font-Family: Sans-Serif; 
    margin-top: 1rem;
    color: ${MAIN_COLOR};
    text-transform:initial;
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
  .drop-shadow {
    box-shadow: 0px 0px 25px -5px rgba(194, 194, 194, 1);
  }
`
export default GlobalStyles
