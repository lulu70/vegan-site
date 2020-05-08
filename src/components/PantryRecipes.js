import React from "react"
import { usePantryState } from "../context/ContextProvider"
import PostPreview from "./PostPreview"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow-y: scroll;
  flex: 4;
  @media (max-width: 900px) {
    flex: 3;
  }
  @media (max-width: 600px) {
    flex: 1;
  }
`

const PantryRecipes = () => {
  const { filteredRecipes } = usePantryState()

  return (
    <Container>
      {filteredRecipes.map(recipe => (
        <PostPreview post={recipe} key={recipe.childMdx.fields.slug} />
      ))}
    </Container>
  )
}

export default PantryRecipes
