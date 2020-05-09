import React from "react"
import { searchInitialState, searchReducer } from "./reducers/searchReducer"
import { pantryInitialState, pantryReducer } from "./reducers/pantryReducer"
import { generalInitialState, generalReducer } from "./reducers/generalReducer"
const GeneralStateContext = React.createContext()
export const useGeneralState = () => {
  const context = React.useContext(GeneralStateContext)
  if (context === undefined) {
    throw new Error("useGeneralState must be used within a ContextProvider")
  }
  return context
}
const GeneralDispatchContext = React.createContext()
export const useGeneralDispatch = () => {
  const context = React.useContext(GeneralDispatchContext)
  if (context === undefined) {
    throw new Error("useGeneralDispatch must be used within a ContextProvider")
  }
  return context
}

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
  const [generalState, generalDispatch] = React.useReducer(
    generalReducer,
    generalInitialState
  )
  const [searchState, searchDispatch] = React.useReducer(
    searchReducer,
    searchInitialState
  )
  const [pantryState, pantryDispatch] = React.useReducer(
    pantryReducer,
    pantryInitialState
  )
  return (
    <GeneralStateContext.Provider value={generalState}>
      <GeneralDispatchContext.Provider value={generalDispatch}>
        <SearchStateContext.Provider value={searchState}>
          <SearchDispatchContext.Provider value={searchDispatch}>
            <PantryStateContext.Provider value={pantryState}>
              <PantryDispatchContext.Provider value={pantryDispatch}>
                {children}
              </PantryDispatchContext.Provider>
            </PantryStateContext.Provider>
          </SearchDispatchContext.Provider>
        </SearchStateContext.Provider>
      </GeneralDispatchContext.Provider>
    </GeneralStateContext.Provider>
  )
}

export default ContextProvider
