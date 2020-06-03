import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import PostHeader from "../components/PostHeader"
import {
  MAIN_FONT_SIZE,
  MEDIUM_HEADER_SIZE,
  SMALL_HEADER_SIZE,
  SMALL_FONT_SIZE,
} from "../constants"
import NutritionValues from "../components/NutritionValues"

const Article = styled.article`
  width: 100%;
  @media (max-width: 900px) {
    margin: 0;
  }
`
const MdxWrapper = styled.div`
  padding: 1rem 1rem 0 1rem;
  font-size: ${MAIN_FONT_SIZE};
  ul,
  ol {
    padding: 0;
    margin: 0 0 1rem 1rem;
  }
  li {
    margin: 0;
    padding: 0;
  }
  h2 {
    font-size: ${MEDIUM_HEADER_SIZE};
    margin: 0 0 0.5rem 0;
  }
  h3 {
    font-size: ${SMALL_HEADER_SIZE};
    margin: 0 0 0.5rem 0;
  }
  h4 {
    font-size: ${SMALL_FONT_SIZE};
    margin: 0 0 0.5rem 0;
  }
  p {
    margin-bottom: 1rem;
  }
  @media (max-width: 900px) {
    padding: 1rem 0 0 0;
  }
`
const EndLine = styled.hr`
  margin: 1rem 0;
`
const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const author = data.author
  const relatedPosts = data.relatedPosts.edges
  return (
    <Layout location={location} relatedPosts={relatedPosts} author={author}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Article>
        <PostHeader post={post} />
        <MdxWrapper>
          <NutritionValues values={post.frontmatter.nutritionValues} />
          <MDXRenderer>{post.body}</MDXRenderer>
        </MdxWrapper>
        <EndLine />
        <footer>
          <Bio author={author} />
        </footer>
      </Article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $tags: [String], $author: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        updatedDate(formatString: "MMMM DD, YYYY")
        description
        tags
        author
        nutritionValues {
          title
          cal
          fat
          protein
          carbs
        }
      }
    }
    author: authorsJson(title: { eq: $author }) {
      title
      image {
        name
      }
    }
    relatedPosts: allMdx(
      filter: {
        frontmatter: { tags: { in: $tags } }
        fields: { slug: { ne: $slug } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
