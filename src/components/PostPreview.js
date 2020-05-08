import React from "react"
import styled from "styled-components"
import StyledLink from "./StyledLink"
import Image from "./Image"
import PropTypes from "prop-types"

const Article = styled.article`
  width: 26%;

  @media (max-width: 900px) {
    width: 45%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`
const PostHeader = styled.h3`
  margin-bottom: 0.5rem;
`

const PostPreview = ({ post }) => {
  return (
    <Article>
      <StyledLink to={post.childMdx.fields.slug}>
        <Image
          filename={post.childMdx.frontmatter.featuredImage.src.name}
          full
        />
      </StyledLink>
      <header>
        <PostHeader>
          <StyledLink to={post.childMdx.fields.slug}>
            {post.childMdx.frontmatter.title}
          </StyledLink>
        </PostHeader>
        <small>
          {post.childMdx.frontmatter.date ===
          post.childMdx.frontmatter.updatedDate
            ? post.childMdx.frontmatter.date
            : `Updated at: ${post.childMdx.frontmatter.updatedDate}`}
        </small>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html:
              post.childMdx.frontmatter.description || post.childMdx.excerpt,
          }}
        />
      </section>
    </Article>
  )
}

export default PostPreview

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
}
