import React from "react"
import StyledLink from "./StyledLink"
import styled from "styled-components"
import { GREY } from "../constants"

const H3 = styled.h3`
  margin-top: 0;
  margin-bottom: 0.4rem;
  font-size: 1rem;
`
const Ul = styled.ul`
  padding: 0;
  margin: 0;
`
const Li = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: solid 1px ${GREY};
  line-height: 1.4rem;
`
const RelatedLink = styled(StyledLink)`
  font-size: 0.7rem;
`

const RelatedPosts = ({ relatedPosts }) => {
  return (
    <div>
      <H3>Related to this: </H3>
      {relatedPosts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Ul key={node.fields.slug}>
            <Li>
              <RelatedLink to={node.fields.slug}>{title}</RelatedLink>
            </Li>
          </Ul>
        )
      })}
    </div>
  )
}

export default RelatedPosts
