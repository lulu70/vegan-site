import React from "react"
// import { Link } from "gatsby"
import styled from "styled-components"
import StyledLink from "./StyledLink"
const Header = styled.h4`
  color: ${props => props.color};
`
const RelatedPosts = ({ blueColor, relatedPosts }) => {
  return (
    <div>
      <Header color={blueColor}>Related Posts:</Header>
      {relatedPosts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <React.Fragment key={node.fields.slug}>
            <header>
              <StyledLink color={blueColor} to={node.fields.slug}>
                {title}
              </StyledLink>
            </header>
            <hr />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default RelatedPosts
