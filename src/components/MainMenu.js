import React from "react"
import StyledLink from "./StyledLink"
import styled from "styled-components"
import { SECOND_COLOR, MAIN_COLOR } from "../constants"
import shortUuid from "short-uuid"

const Ul = styled.ul`
  display: flex;
  flex: 1;
  margin: 0;
`
const Li = styled.li`
  list-style-type: none;
  padding: 0 1rem;
  margin: 0;
`

const MainMenu = () => {
  const pages = [
    {
      name: "Recipes",
      id: shortUuid.generate(),
      slug: "/recipes/",
    },
    {
      name: "The vegan pantry",
      id: shortUuid.generate(),
      slug: "/the-vegan-pantry/",
    },
  ]
  return (
    <div className="MainMenu__navWrapper">
      <nav>
        <Ul>
          {pages.map((page) => (
            <Li key={page.id}>
              <StyledLink
                $fontColor={MAIN_COLOR}
                to={page.slug}
                activeStyle={{ color: SECOND_COLOR }}
              >
                {page.name}
              </StyledLink>
            </Li>
          ))}
        </Ul>
      </nav>
    </div>
  )
}

export default MainMenu
