import React from "react"
import { usePantryDispatch, usePantryState } from "../context/ContextProvider"
import {
  setIngredients,
  setFilteredIngredients,
  setSelectedIngredients,
  setFilteredRecipes,
  setShowSelectedIngredients,
} from "../context/reducers/pantryReducer"
import styled from "styled-components"
import { MAIN_COLOR, SECOND_COLOR } from "../constants"
import TickIcon from "../../content/assets/tick.svg"
import PantryInput from "./PantryInput"
import ClearIcon from "../../content/assets/clear.svg"

const Container = styled.div`
  border: solid 1px;
  padding: 0.5rem;
  width: 20rem;
  flex: 1;
  .pantry-ingredients__top-container {
    min-height: 3rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
  ul {
    overflow-y: scroll;
    height: 20rem;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
    width: 50%;
    height: 5rem;
  }
  .pantry-ingredients__button {
    position: relative;
    background-color: ${MAIN_COLOR};
    padding: 0.1rem;
    color: ${SECOND_COLOR};
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  .pantry-ingredients__tick-icon {
    fill: ${SECOND_COLOR};
    position: absolute;
    bottom: 3px;
    right: 3px;
  }
  .pantry-ingredients__clear-button {
    fill: ${SECOND_COLOR};
    cursor: pointer;
  }
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
  const removeAllSelectedIngredient = () => {
    setSelectedIngredients(pantryDispatch, [])
    setShowSelectedIngredients(pantryDispatch, false)
  }
  const ingredientsToShow = showSelectedIngredients
    ? selectedIngredients
    : filteredIngredients
  return (
    <Container>
      <div className="pantry-ingredients__top-container">
        {showSelectedIngredients ? (
          <ClearIcon
            className="pantry-ingredients__clear-button"
            onClick={removeAllSelectedIngredient}
          />
        ) : (
          <PantryInput />
        )}
      </div>
      <ul>
        {ingredientsToShow.map(ingredient => {
          const isSelected = selectedIngredients.includes(ingredient)
          return (
            <li key={ingredient}>
              <button
                className="pantry-ingredients__button"
                onClick={() =>
                  isSelected
                    ? removeSelectedIngredient(ingredient)
                    : addSelectedIngredient(ingredient)
                }
              >
                {ingredient}
                {isSelected && (
                  <TickIcon className="pantry-ingredients__tick-icon" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default PantryIngredients
