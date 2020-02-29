import React from "react"
import StyledLink from "./StyledLink"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { upperCase } from "../utils/helpers"
const Ul = styled.ul`
  display: flex;
  flex: 1;
  margin: 0;
`
const Li = styled.li`
  list-style-type: none;
  padding: 1rem;
`

const MainMenu = () => {
  const data = useStaticQuery(graphql`
    {
      pages: allFile(
        filter: {
          sourceInstanceName: { eq: "pages" }
          name: { nin: ["404", "index"] }
        }
      ) {
        nodes {
          name
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  return (
    <div className="MainMenu__navWrapper">
      <nav>
        <Ul>
          {data.pages.nodes.map(page => (
            <Li key={page.id}>
              <StyledLink color="white" to={page.fields.slug}>
                {upperCase(page.name)}
              </StyledLink>
            </Li>
          ))}
        </Ul>
      </nav>
    </div>
  )
}

export default MainMenu
