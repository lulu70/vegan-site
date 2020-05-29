import React from "react"
import { usePantryDispatch, usePantryState } from "../context/ContextProvider"
import {
  setIngredients,
  setFilteredIngredients,
  setSelectedIngredients,
  setFilteredRecipes,
} from "../context/reducers/pantryReducer"
import styled from "styled-components"
import { SECOND_COLOR, GREY, MAIN_FONT_SIZE } from "../constants"
import TickIcon from "../../content/assets/tick.svg"
import Circle from "../../content/assets/circle.svg"
import ScrollArea from "./ScrollArea"

const ScrollContainer = styled(ScrollArea)`
  flex: 1;
  max-width: 15rem;
  margin-right: 1rem;
`
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;
  flex: 1;
`
const Li = styled.li`
  padding: 1px 0;
  margin: 0;
  display: flex;
`
const Button = styled.button`
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-style: solid;
  border-color: ${GREY};
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  background-color: transparent;
  text-align: left;
  display: flex;
  align-items: center;
  font-size: ${MAIN_FONT_SIZE};
  .pantry-ingredients__icon {
    width: 15px;
    pointer-events: none;
    margin-right: 0.5rem;
    @media (max-width: 600px) {
      width: 10px;
    }
  }
`

const StyledTickIcon = styled(TickIcon)`
  fill: ${SECOND_COLOR};
`
const StyledCircle = styled(Circle)`
  stroke: ${SECOND_COLOR};
`

const PantryIngredients = ({ recipes }) => {
  const { filteredIngredients, selectedIngredients } = usePantryState()
  const pantryDispatch = usePantryDispatch()

  React.useEffect(() => {
    const allIngredients = recipes.reduce((acc, recipe) => {
      const ingredients = recipe.ingredients
      if (ingredients) return [...acc, ...ingredients]
      return acc
    }, [])

    const uniqueIngredients = allIngredients
      .filter(
        (ingredient, index) => allIngredients.indexOf(ingredient) === index
      )
      .map((word) => word.toLowerCase())
      .sort()

    setIngredients(pantryDispatch, uniqueIngredients)
    setFilteredIngredients(pantryDispatch, uniqueIngredients)
  }, [pantryDispatch, recipes])

  React.useEffect(() => {
    const filtered = recipes.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map((ingredient) =>
        ingredient.toLowerCase()
      )
      const hasAllSelectedIngredients = selectedIngredients.every((selected) =>
        recipeIngredients.includes(selected)
      )
      if (selectedIngredients.length < 1) return false
      return hasAllSelectedIngredients
    })
    setFilteredRecipes(pantryDispatch, filtered)
  }, [selectedIngredients, recipes, pantryDispatch])

  const addSelectedIngredient = (ingredient) => {
    const isUniqueIngredient = !selectedIngredients.includes(ingredient)
    if (isUniqueIngredient)
      setSelectedIngredients(pantryDispatch, [
        ...selectedIngredients,
        ingredient,
      ])
  }
  const removeSelectedIngredient = (ingredient) => {
    const index = selectedIngredients.indexOf(ingredient)
    const newIngredients = [
      ...selectedIngredients.slice(0, index),
      ...selectedIngredients.slice(index + 1),
    ]
    setSelectedIngredients(pantryDispatch, newIngredients)
  }

  return (
    <ScrollContainer
      className="drop-shadow"
      data-test-id="pantryIngredients__container"
      contentStyles={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Ul>
        {filteredIngredients.map((ingredient) => {
          const isSelected = selectedIngredients.includes(ingredient)
          return (
            <Li key={ingredient}>
              <Button
                onClick={(e) => {
                  e.target.blur()
                  isSelected
                    ? removeSelectedIngredient(ingredient)
                    : addSelectedIngredient(ingredient)
                }}
              >
                {isSelected ? (
                  <StyledTickIcon
                    className="pantry-ingredients__icon"
                    data-test-id="pantry-ingredients__tickIcon"
                  />
                ) : (
                  <StyledCircle className="pantry-ingredients__icon" />
                )}
                {ingredient}
              </Button>
            </Li>
          )
        })}
      </Ul>
    </ScrollContainer>
  )
}

export default PantryIngredients
