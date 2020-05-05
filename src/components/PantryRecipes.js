import React from "react"
import StyledLink from "../components/StyledLink"
import { usePantryState } from "../context/ContextProvider"

const PantryRecipes = () => {
  const { filteredRecipes } = usePantryState()

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.childMdx.id}>
            <StyledLink to={recipe.childMdx.fields.slug}>
              {recipe.childMdx.frontmatter.title}
            </StyledLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PantryRecipes
