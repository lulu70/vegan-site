import React from "react"
import styled from "styled-components"
import { usePantryState } from "../context/ContextProvider"

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.9rem;
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
      <small>All items: {ingredients.length}</small>
      <Divider />
      <small>Selected items: {selectedIngredients.length}</small>
      <Divider />
      <small>Matched recipes: {filteredRecipes.length}</small>
    </Container>
  )
}

export default PantryMenu
