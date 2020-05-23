import React from "react"
import { usePantryState } from "../context/ContextProvider"
import PostPreview from "./PostPreview"
import styled from "styled-components"
import ScrollArea from "./ScrollArea"

const ScrollContainer = styled(ScrollArea)`
  flex: 4;
  @media (max-width: 900px) {
    flex: 3;
  }
  @media (max-width: 600px) {
    flex: 1;
  }
`
const H2 = styled.h2`
  flex: 1;
  text-align: center;
`
const PantryRecipes = () => {
  const { filteredRecipes } = usePantryState()
  return (
    <ScrollContainer
      data-test-id="pantryRecipes__container"
      contentStyles={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {filteredRecipes.length < 1 && <H2>No match found</H2>}
      {filteredRecipes.map(recipe => (
        <PostPreview post={recipe} key={recipe.childMdx.fields.slug} />
      ))}
    </ScrollContainer>
  )
}

export default PantryRecipes
