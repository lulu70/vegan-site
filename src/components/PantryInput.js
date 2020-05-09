import React from "react"
import { usePantryDispatch, usePantryState } from "../context/ContextProvider"
import SearchIcon from "../../content/assets/search.svg"
import ClearIcon from "../../content/assets/clear.svg"
import styled from "styled-components"
import { SECOND_COLOR } from "../constants"
import {
  setFilteredIngredients,
  setSelectedIngredients,
  setShowSelectedIngredients,
  setFilterInput,
} from "../context/reducers/pantryReducer"

const Label = styled.label`
  display: flex;
  align-items: center;
  position: sticky;
  background-color: white;
  top: 0;
  z-index: 1;
  min-height: 3rem;
  border-bottom: solid 1px lightgrey;
  padding: 0 0.5rem;
  .pantry-input__icon {
    fill: ${SECOND_COLOR};
    position: absolute;
    right: 0.5rem;
    cursor: pointer;
  }
`
const Input = styled.input`
  width: 100%;
  border: none;
`

const PantryInput = () => {
  const { filterInput, ingredients, showSelectedIngredients } = usePantryState()
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
  const removeAllSelectedIngredient = () => {
    setSelectedIngredients(pantryDispatch, [])
    setShowSelectedIngredients(pantryDispatch, false)
  }

  return (
    <Label htmlFor="input">
      {showSelectedIngredients ? (
        <ClearIcon
          className="pantry-input__icon"
          role="button"
          onClick={removeAllSelectedIngredient}
        />
      ) : (
        <>
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
        </>
      )}
    </Label>
  )
}

export default PantryInput
