import React from "react"
import { searchInitialState, searchReducer } from "./reducers/searchReducer"
export const Context = React.createContext()

const ContextProvider = ({ children }) => {
  const [searchState, searchDispatch] = React.useReducer(
    searchReducer,
    searchInitialState
  )

  return (
    <Context.Provider value={{ searchState, searchDispatch }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
