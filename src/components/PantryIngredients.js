import React from "react"
import { usePantryDispatch, usePantryState } from "../context/ContextProvider"
import {
  setIngredients,
  setFilteredIngredients,
  setSelectedIngredients,
  setFilteredRecipes,
} from "../context/reducers/pantryReducer"
import styled from "styled-components"
import { SECOND_COLOR } from "../constants"
import TickIcon from "../../content/assets/tick.svg"
import PantryInput from "./PantryInput"

const Container = styled.div`
  overflow-y: scroll;
  box-shadow: 0px 0px 25px -5px rgba(194, 194, 194, 1);
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  flex: 1;
`
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;
`
const Li = styled.li`
  padding: 0.5rem 0;
  margin: 0;
`
const Button = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
`
const StyledTickIcon = styled(TickIcon)`
  fill: ${SECOND_COLOR};
  position: absolute;
  bottom: 3px;
  right: 3px;
`

const PantryIngredients = ({ recipes }) => {
  const {
    filteredIngredients,
    selectedIngredients,
    showSelectedIngredients,
  } = usePantryState()
  const pantryDispatch = usePantryDispatch()

  React.useEffect(() => {
    const allIngredients = recipes.reduce((acc, recipe) => {
      const ingredients = recipe.childMdx.frontmatter.ingredients
      if (ingredients) return [...acc, ...ingredients]
      return acc
    }, [])

    const uniqueIngredients = allIngredients
      .filter(
        (ingredient, index) => allIngredients.indexOf(ingredient) === index
      )
      .map(word => word.toLowerCase())
      .sort()

    setIngredients(pantryDispatch, uniqueIngredients)
    setFilteredIngredients(pantryDispatch, uniqueIngredients)
  }, [pantryDispatch, recipes])

  React.useEffect(() => {
    const filtered = recipes.filter(recipe => {
      const recipeIngredients = recipe.childMdx.frontmatter.ingredients.map(
        ingredient => ingredient.toLowerCase()
      )
      const hasAllSelectedIngredients = selectedIngredients.every(selected =>
        recipeIngredients.includes(selected)
      )
      if (selectedIngredients.length < 1) return false
      return hasAllSelectedIngredients
    })
    setFilteredRecipes(pantryDispatch, filtered)
  }, [selectedIngredients, recipes, pantryDispatch])

  const addSelectedIngredient = ingredient => {
    const isUniqueIngredient = !selectedIngredients.includes(ingredient)
    if (isUniqueIngredient)
      setSelectedIngredients(pantryDispatch, [
        ...selectedIngredients,
        ingredient,
      ])
  }
  const removeSelectedIngredient = ingredient => {
    const index = selectedIngredients.indexOf(ingredient)
    const newIngredients = [
      ...selectedIngredients.slice(0, index),
      ...selectedIngredients.slice(index + 1),
    ]
    setSelectedIngredients(pantryDispatch, newIngredients)
  }

  const ingredientsToShow = showSelectedIngredients
    ? selectedIngredients
    : filteredIngredients
  return (
    <Container>
      <PantryInput />
      <Ul>
        {ingredientsToShow.map(ingredient => {
          const isSelected = selectedIngredients.includes(ingredient)
          return (
            <Li key={ingredient}>
              <Button
                onClick={() =>
                  isSelected
                    ? removeSelectedIngredient(ingredient)
                    : addSelectedIngredient(ingredient)
                }
              >
                {ingredient}
                {isSelected && <StyledTickIcon />}
              </Button>
            </Li>
          )
        })}
      </Ul>
    </Container>
  )
}

export default PantryIngredients
