import React from "react"
import StyledLink from "./StyledLink"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { makePretty } from "../utils/helpers"
import { SECOND_COLOR, MAIN_COLOR } from "../constants"
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
  const data = useStaticQuery(graphql`
    {
      pages: allFile(
        filter: {
          sourceInstanceName: { eq: "pages" }
          name: { nin: ["404", "index", "app"] }
        }
        sort: { fields: fields___slug, order: ASC }
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
          {data.pages.nodes.map((page) => (
            <Li key={page.id}>
              <StyledLink
                fontColor={MAIN_COLOR}
                to={page.fields.slug}
                activeStyle={{ color: SECOND_COLOR }}
              >
                {makePretty(page.name)}
              </StyledLink>
            </Li>
          ))}
        </Ul>
      </nav>
    </div>
  )
}

export default MainMenu
