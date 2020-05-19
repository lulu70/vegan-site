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
  width: 26%;
  margin-bottom: 1rem;
  @media (max-width: 1200px) {
    width: 45%;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`
const StyledImage = styled(Image)`
  padding-top: 47.61905%;
  height: 0;
`
const SmallRow = styled.small`
  padding: 0 1rem;
  display: flex;
  /* justify-content: space-evenly; */
  p {
    margin: 0;
  }
`
const BigRow = styled.div`
  background-color: white;
  flex: 1;
  padding: 1rem;
`

const PostHeader = styled.h3`
  margin-bottom: 0.5rem;
`

const PostPreview = ({ post }) => {
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
      <StyledLink to={post.childMdx.fields.slug}>
        <StyledImage
          filename={post.childMdx.frontmatter.featuredImage.src.name}
          full
        />
      </StyledLink>
      <SmallRow>
        <NutritionValues values={post.childMdx.frontmatter.nutritionValues} />
      </SmallRow>
      <BigRow>
        <PostHeader>
          <StyledLink to={post.childMdx.fields.slug}>
            {post.childMdx.frontmatter.title}
          </StyledLink>
        </PostHeader>
        <p
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
