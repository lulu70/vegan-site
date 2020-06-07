import { createGlobalStyle } from "styled-components"
import {
  MAIN_COLOR,
  SECOND_COLOR,
  BG_COLOR,
  MEDIUM_HEADER_SIZE,
  SMALL_HEADER_SIZE,
  SMALL_FONT_SIZE,
} from "./constants"
const GlobalStyles = createGlobalStyle`
  * {
    :focus{
      outline-color:${SECOND_COLOR};  
      outline-style:solid;
      outline-width: 1px;
      outline-offset: -1px;
    }
  }
  html, body {
    font-Family: Sans-Serif;
    background-color: ${BG_COLOR};
  }
  h1, h2, h3, h4, h5, h6  {
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
  .drop-shadow {
    box-shadow: 0px 0px 25px -5px rgba(194, 194, 194, 1);
  }
  button {
    touch-action: manipulation;
  }
  ul,
  ol {
    padding: 0;
    margin: 0 0 1rem 1rem;
  }
  li {
    margin: 0;
    padding: 0;
  }
  h2 {
    font-size: ${MEDIUM_HEADER_SIZE};
    margin: 0 0 0.5rem 0;
  }
  h3 {
    font-size: ${SMALL_HEADER_SIZE};
    margin: 0 0 0.5rem 0;
  }
  h4 {
    font-size: ${SMALL_FONT_SIZE};
    margin: 0 0 0.5rem 0;
  }
  p {
    margin-bottom: 1rem;
  }
`
export default GlobalStyles
