import React from "react"
import styled from "styled-components"
import { usePantryState, usePantryDispatch } from "../context/ContextProvider"
import { setSelectedIngredients } from "../context/reducers/pantryReducer"
import ScrollArea from "./ScrollArea"
import { GREY, MAIN_FONT_SIZE, BG_COLOR } from "../constants"

const StyledScrollArea = styled(ScrollArea)`
  flex: 1;
  max-width: 15rem;
`
const Li = styled.li`
  list-style: none;
  background-color: ${GREY};
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-style: solid;
  border-color: ${BG_COLOR};
  font-size: ${MAIN_FONT_SIZE};
  padding: 0.5rem;
  flex: 1;
  text-align: center;
  cursor: pointer;
`
const PantrySelectedIngredients = () => {
  const { selectedIngredients } = usePantryState()
  const pantryDispatch = usePantryDispatch()
  const removeSelectedIngredient = (index) => {
    const newIngredients = [
      ...selectedIngredients.slice(0, index),
      ...selectedIngredients.slice(index + 1),
    ]
    setSelectedIngredients(pantryDispatch, newIngredients)
  }

  return (
    <StyledScrollArea
      className="drop-shadow"
      data-test-id="pantrySelectedIngredients__container"
    >
      {selectedIngredients.map((ingredient, index) => (
        <Li
          role="button"
          key={ingredient}
          onClick={() => {
            removeSelectedIngredient(index)
          }}
        >
          {ingredient}
        </Li>
      ))}
    </StyledScrollArea>
  )
}

export default PantrySelectedIngredients
