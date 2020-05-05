import React from "react"
import { usePantryDispatch, usePantryState } from "../context/ContextProvider"
import {
  setIngredients,
  setFilteredIngredients,
  setFilterInput,
  setSelectedIngredients,
} from "../context/reducers/pantryReducer"
const PantryIngredients = ({ recipes }) => {
  const {
    ingredients,
    filteredIngredients,
    filterInput,
    selectedIngredients,
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

  const handleInputChange = e => {
    setFilterInput(pantryDispatch, e.target.value)
    const filtered = ingredients.filter(ingredient =>
      ingredient.includes(e.target.value.toLowerCase())
    )
    setFilteredIngredients(pantryDispatch, filtered)
  }

  const handleIngredientClick = ingredient => {
    const isUniqueIngredient = !selectedIngredients.includes(ingredient)
    if (isUniqueIngredient)
      setSelectedIngredients(pantryDispatch, [
        ...selectedIngredients,
        ingredient,
      ])
  }

  return (
    <div>
      <h2>Ingredients</h2>
      <input value={filterInput} onChange={handleInputChange} />
      <ul className="ingredients-list">
        {filteredIngredients.map(ingredient => (
          <li key={ingredient}>
            <button onClick={() => handleIngredientClick(ingredient)}>
              {ingredient}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PantryIngredients
