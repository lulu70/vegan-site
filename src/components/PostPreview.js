import React from "react"
import styled from "styled-components"
import StyledLink from "./StyledLink"
import { AnimationWrapper } from "react-hover-animation"
import NutritionalValues from "./NutritionalValues"
import { MAIN_FONT_SIZE, SMALL_FONT_SIZE } from "../constants"
import GatsbyImage from "gatsby-image"

const AnimatedContainer = styled(AnimationWrapper)`
  display: flex;
  flex-direction: column;
  width: 49%;
  margin-bottom: 1rem;
`
const StyledImage = styled(GatsbyImage)`
  padding-top: 56.25%;
  height: 0;
`
const SmallRow = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  p {
    margin: 0;
    padding: 0;
  }
`
const BigRow = styled.div`
  background-color: white;
  flex: 1;
  padding: 0.2rem;
  text-align: center;
`
const P = styled.p`
  padding: 0;
  margin: 0;
  font-size: ${SMALL_FONT_SIZE};
`
const PostHeader = styled.h2`
  margin: 0 0 0.1rem 0;
  font-size: ${MAIN_FONT_SIZE};
`

const PostPreview = ({ post, onClick }) => {
  return (
    <AnimatedContainer
      className="drop-shadow"
      data-test-id="postPreview__container"
      config={{
        opacity: {
          initial: 1,
          onHover: 0.9,
        },
      }}
    >
      <StyledLink
        to={post.childMdx.fields.slug}
        data-test-id="postPreview__link"
        onClick={onClick}
      >
        <StyledImage
          fluid={post.childMdx.frontmatter.images[0].childImageSharp.fluid}
          title={post.childMdx.frontmatter.images[0].name}
          alt={post.childMdx.frontmatter.images[0].name}
        />
      </StyledLink>
      <SmallRow>
        <NutritionalValues
          values={post.childMdx.frontmatter.nutritionalValues}
          fromPostPreview
        />
      </SmallRow>
      <BigRow>
        <PostHeader data-test-id="postPreview__header">
          <StyledLink to={post.childMdx.fields.slug} onClick={onClick}>
            {post.childMdx.frontmatter.title}
          </StyledLink>
        </PostHeader>
        <P
          dangerouslySetInnerHTML={{
            __html:
              post.childMdx.frontmatter.description || post.childMdx.excerpt,
          }}
        />
      </BigRow>
    </AnimatedContainer>
  )
}

export default PostPreview
