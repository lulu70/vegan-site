import React from "react"
import styled from "styled-components"
import { usePantryState, usePantryDispatch } from "../context/ContextProvider"
import { setShowSelectedIngredients } from "../context/reducers/pantryReducer"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  width: 100%;
  position: sticky;
  bottom: 0;
`
const Divider = styled.div`
  border: solid 1px;
  height: 1.5rem;
  margin: 0 0.2rem;
`

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  :disabled {
    cursor: initial;
    color: grey;
  }
`
const PantryMenu = () => {
  const { selectedIngredients, ingredients } = usePantryState()
  const pantryDispatch = usePantryDispatch()

  return (
    <Container>
      <Button
        onClick={() => {
          setShowSelectedIngredients(pantryDispatch, false)
        }}
      >
        All items: {ingredients.length}
      </Button>
      <Divider />
      <Button
        disabled={selectedIngredients.length < 1}
        onClick={() => {
          setShowSelectedIngredients(pantryDispatch, true)
        }}
      >
        Selected items: {selectedIngredients.length}
      </Button>
    </Container>
  )
}

export default PantryMenu
