import React from "react"
import { usePantryDispatch, usePantryState } from "../context/ContextProvider"
import SearchIcon from "../../content/assets/search.svg"
import ClearIcon from "../../content/assets/clear.svg"
import styled from "styled-components"
import { SECOND_COLOR, BG_COLOR } from "../constants"
import {
  setFilteredIngredients,
  setFilterInput,
} from "../context/reducers/pantryReducer"

const Label = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  top: 0;
  z-index: 1;
  min-height: 3rem;
  padding: 0 0.5rem;
  background-color: ${BG_COLOR};
  margin-bottom: 1rem;
  .pantry-input__icon {
    fill: ${SECOND_COLOR};
    position: absolute;
    right: 0.8rem;
    cursor: pointer;
  }
`
const Input = styled.input`
  width: 100%;
  border: solid 1px lightgray;
  background-color: ${BG_COLOR};
`

const PantryInput = () => {
  const { filterInput, ingredients } = usePantryState()
  const pantryDispatch = usePantryDispatch()

  const handleInputChange = e => {
    setFilterInput(pantryDispatch, e.target.value)
    const filtered = ingredients.filter(ingredient =>
      ingredient.includes(e.target.value.toLowerCase())
    )
    setFilteredIngredients(pantryDispatch, filtered)
  }

  const handleClearClick = () => {
    setFilterInput(pantryDispatch, "")
    setFilteredIngredients(pantryDispatch, ingredients)
  }

  return (
    <Label htmlFor="input">
      <Input value={filterInput} id="input" onChange={handleInputChange} />
      {filterInput ? (
        <ClearIcon
          className="pantry-input__icon"
          onClick={handleClearClick}
          role="button"
        />
      ) : (
        <SearchIcon className="pantry-input__icon" />
      )}
    </Label>
  )
}

export default PantryInput
