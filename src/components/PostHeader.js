import React from "react"
import styled from "styled-components"
import {
  GREY,
  MAIN_FONT_SIZE,
  SMALL_FONT_SIZE,
  MAIN_HEADER_SIZE,
} from "../constants"
import PropTypes from "prop-types"

const Header = styled.header`
  border-bottom: ${(props) => (props.aside ? "none" : `solid 1px ${GREY}`)};
  text-align: center;
  position: relative;
  padding: 1rem;
  min-height: 6rem;
  width: 100%;
`
const H1 = styled.h1`
  font-size: ${MAIN_HEADER_SIZE};
  margin-top: 0;
  margin-bottom: 0.5rem;
`
const H2 = styled.h2`
  font-size: ${MAIN_HEADER_SIZE};
  margin-top: 0;
  margin-bottom: 0.5rem;
`
const Description = styled.div`
  font-size: ${MAIN_FONT_SIZE};
`
const Small = styled.small`
  position: absolute;
  bottom: 0;
  left: 1rem;
  font-size: ${SMALL_FONT_SIZE};
  @media (max-width: 900px) {
    left: 0;
  }
`

const PostHeader = ({ post, title, description, aside }) => {
  return (
    <Header aside={aside}>
      {post ? (
        <>
          <H1 data-test-id="postHeader__h1">{post.frontmatter.title}</H1>
          <Description data-test-id="postHeader__description">
            {post.frontmatter.description}
          </Description>
          <Small data-test-id="postHeader__date">
            {post.frontmatter.date === post.frontmatter.updatedDate
              ? post.frontmatter.date
              : `Updated at: ${post.frontmatter.updatedDate}`}
          </Small>
        </>
      ) : (
        <>
          {aside ? (
            <>
              {title && <H2 data-test-id="postHeader__h2">{title}</H2>}
              {description && <Description>{description}</Description>}
            </>
          ) : (
            <>
              {title && <H1 data-test-id="postHeader__h1">{title}</H1>}
              {description && <Description>{description}</Description>}
            </>
          )}
        </>
      )}
    </Header>
  )
}

export default PostHeader

PostHeader.propTypes = {
  post: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  aside: PropTypes.bool,
}
