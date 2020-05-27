import React from "react"
import styled from "styled-components"
import StyledLink from "./StyledLink"
import Image from "./Image"
import PropTypes from "prop-types"
import { AnimationWrapper } from "react-hover-animation"
import NutritionValues from "./NutritionValues"

const AnimatedContainer = styled(AnimationWrapper)`
  display: flex;
  flex-direction: column;
  width: 49%;
  margin-bottom: 1rem;
`
const StyledImage = styled(Image)`
  padding-top: 47.61905%;
  height: 0;
`
const SmallRow = styled.small`
  padding: 0 1rem;
  display: flex;
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
  font-size: 0.7rem;
`
const PostHeader = styled.h2`
  margin: 0 0 0.1rem 0;
  font-size: 0.8rem;
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
          filename={post.childMdx.frontmatter.featuredImage.src.name}
        />
      </StyledLink>
      <SmallRow>
        <NutritionValues values={post.childMdx.frontmatter.nutritionValues} />
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

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
}
