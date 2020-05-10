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
import Circle from "../../content/assets/circle.svg"
import PantryInput from "./PantryInput"
import ScrollArea from "./ScrollArea"

const ScrollContainer = styled(ScrollArea)`
  box-shadow: 0px 0px 25px -5px rgba(194, 194, 194, 1);
  margin-right: 1rem;
  background-color: white;
  flex: 1;
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
`
const Button = styled.button`
  border-top: 0;
  border-left: 0;
  border-right: 0;

  border-style: solid;
  border-color: lightgrey;
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  background-color: transparent;
  text-align: left;
  display: flex;
  align-items: center;
`
const StyledTickIcon = styled(TickIcon)`
  fill: ${SECOND_COLOR};
  width: 20px;
  margin-right: 0.5rem;
  @media (max-width: 600px) {
    width: 10px;
  }
`
const StyledCircle = styled(Circle)`
  stroke: ${SECOND_COLOR};
  width: 20px;
  margin-right: 0.5rem;
  @media (max-width: 600px) {
    width: 10px;
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
  const ingredientsToShow = showSelectedIngredients
    ? selectedIngredients
    : filteredIngredients
  return (
    <ScrollContainer
      contentStyles={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <PantryInput />
      <Ul>
        {ingredientsToShow.map(ingredient => {
          const isSelected = selectedIngredients.includes(ingredient)
          return (
            <Li key={ingredient}>
              <Button
                onClick={e => {
                  e.target.blur()
                  isSelected
                    ? removeSelectedIngredient(ingredient)
                    : addSelectedIngredient(ingredient)
                }}
              >
                {isSelected ? <StyledTickIcon /> : <StyledCircle />}
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
