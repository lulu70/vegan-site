import React from "react"
import { usePantryDispatch, usePantryState } from "../context/ContextProvider"
import { setSelectedIngredients } from "../context/reducers/pantryReducer"
import { setFilteredRecipes } from "../context/reducers/pantryReducer"

const PantrySelectedIngredients = ({ recipes }) => {
  const { selectedIngredients } = usePantryState()
  const pantryDispatch = usePantryDispatch()

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

  const handleRemoveSelectedIngredient = index => {
    const newIngredients = [
      ...selectedIngredients.slice(0, index),
      ...selectedIngredients.slice(index + 1),
    ]
    setSelectedIngredients(pantryDispatch, newIngredients)
  }
  return (
    <div>
      <h2>Selected Ingredients</h2>
      <ul>
        {selectedIngredients.map((ingredient, index) => (
          <li key={ingredient}>
            <div>
              {ingredient}
              <button
                onClick={() => {
                  handleRemoveSelectedIngredient(index)
                }}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PantrySelectedIngredients
