import React from "react"
import styled from "styled-components"
import { usePantryState } from "../context/ContextProvider"
import { MAIN_FONT_SIZE } from "../constants"

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${MAIN_FONT_SIZE};
  margin-bottom: 1rem;
`
const Divider = styled.div`
  border: solid 1px;
  height: 1.3rem;
  margin: 0 0.2rem;
`
const PantryMenu = () => {
  const { selectedIngredients, ingredients, filteredRecipes } = usePantryState()

  return (
    <Container>
      <small data-test-id="pantryMenu__allItems">
        All items: <span>{ingredients.length}</span>
      </small>
      <Divider />
      <small data-test-id="pantryMenu__selectedItems">
        Selected items: <span>{selectedIngredients.length}</span>
      </small>
      <Divider />
      <small data-test-id="pantryMenu__matchedRecipes">
        Matched recipes: <span>{filteredRecipes.length}</span>
      </small>
    </Container>
  )
}

export default PantryMenu
