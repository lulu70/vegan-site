import React from "react"
import ContextProvider from "./src/context/ContextProvider"

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism.css"
export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
}
export const wrapRootElement = ({ element }) => (
  <ContextProvider>{element}</ContextProvider>
)
