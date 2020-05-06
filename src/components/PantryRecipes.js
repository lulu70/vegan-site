import React from "react"
import StyledLink from "../components/StyledLink"
import { usePantryState } from "../context/ContextProvider"
import styled from "styled-components"
import Image from "../components/Image"
const Container = styled.div`
  border: solid 1px;
  padding: 0.5rem;
  width: 20rem;
  height: 25rem;
  overflow-y: scroll;
  flex: 3;
`
const StyledLi = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
`
const StyledUl = styled.ul`
  padding: 0;
  margin: 0;
`
const RecipeLink = styled(StyledLink)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const StyledImage = styled(Image)`
  width: 150px;
  height: 150px;
`
const H3 = styled.h3`
  margin-top: 0;
`

const PantryRecipes = () => {
  const { filteredRecipes } = usePantryState()

  return (
    <Container>
      {/* <h3>Recipes</h3> */}
      <StyledUl>
        {filteredRecipes.map(recipe => (
          <StyledLi key={recipe.childMdx.id}>
            <RecipeLink to={recipe.childMdx.fields.slug}>
              <div>
                <H3>{recipe.childMdx.frontmatter.title}</H3>
                <p>{recipe.childMdx.frontmatter.description}</p>
              </div>
              <StyledImage
                filename={recipe.childMdx.frontmatter.featuredImage.src.name}
              />
            </RecipeLink>
          </StyledLi>
        ))}
      </StyledUl>
    </Container>
  )
}

export default PantryRecipes
