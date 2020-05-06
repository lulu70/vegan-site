import React from "react"
import { usePantryDispatch, usePantryState } from "../context/ContextProvider"
import {
  setFilteredIngredients,
  setFilterInput,
} from "../context/reducers/pantryReducer"
import SearchIcon from "../../content/assets/search.svg"
import ClearIcon from "../../content/assets/clear.svg"
import styled from "styled-components"
import { SECOND_COLOR } from "../constants"

const Label = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  position: sticky;
  flex: 1;
  .pantry-input__icon {
    fill: ${SECOND_COLOR};
    position: absolute;
    right: 0.5rem;
    cursor: pointer;
  }
  input {
    flex: 1;
  }
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
      {filterInput ? (
        <ClearIcon
          className="pantry-input__icon"
          onClick={handleClearClick}
          role="button"
        />
      ) : (
        <SearchIcon className="pantry-input__icon" />
      )}
      <input value={filterInput} id="input" onChange={handleInputChange} />
    </Label>
  )
}

export default PantryInput
