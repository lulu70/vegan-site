import React from "react"
import ContextProvider from "./src/context/ContextProvider"

export const wrapRootElement = ({ element }) => (
  <ContextProvider>{element}</ContextProvider>
)
