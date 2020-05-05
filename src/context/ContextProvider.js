import React from "react"
import { searchInitialState, searchReducer } from "./reducers/searchReducer"
import { pantryInitialState, pantryReducer } from "./reducers/pantryReducer"

const SearchStateContext = React.createContext()
export const useSearchState = () => {
  const context = React.useContext(SearchStateContext)
  if (context === undefined) {
    throw new Error("useSearchState must be used within a ContextProvider")
  }
  return context
}

const SearchDispatchContext = React.createContext()
export const useSearchDispatch = () => {
  const context = React.useContext(SearchDispatchContext)
  if (context === undefined) {
    throw new Error("useSearchDispatch must be used within a ContextProvider")
  }
  return context
}

const PantryStateContext = React.createContext()
export const usePantryState = () => {
  const context = React.useContext(PantryStateContext)
  if (context === undefined) {
    throw new Error("usePantryState must be used within a ContextProvider")
  }
  return context
}

const PantryDispatchContext = React.createContext()
export const usePantryDispatch = () => {
  const context = React.useContext(PantryDispatchContext)
  if (context === undefined) {
    throw new Error("usePantryDispatch must be used within a ContextProvider")
  }
  return context
}

const ContextProvider = ({ children }) => {
  const [searchState, searchDispatch] = React.useReducer(
    searchReducer,
    searchInitialState
  )
  const [pantryState, pantryDispatch] = React.useReducer(
    pantryReducer,
    pantryInitialState
  )
  return (
    <SearchStateContext.Provider value={searchState}>
      <SearchDispatchContext.Provider value={searchDispatch}>
        <PantryStateContext.Provider value={pantryState}>
          <PantryDispatchContext.Provider value={pantryDispatch}>
            {children}
          </PantryDispatchContext.Provider>
        </PantryStateContext.Provider>
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  )
}

export default ContextProvider
