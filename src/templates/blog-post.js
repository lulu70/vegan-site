import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

const Header = styled.h1`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`
const DateParagraph = styled.p`
  ${scale(-1 / 5)};
  display: block;
  margin-bottom: ${rhythm(1)};
`
const EndLine = styled.hr`
  margin-bottom: ${rhythm(1)};
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
      <article>
        <header>
          <Header>{post.frontmatter.title}</Header>
          <DateParagraph>{post.frontmatter.date}</DateParagraph>
        </header>
        <MDXRenderer>{post.body}</MDXRenderer>
        <EndLine />
        <footer>
          <Bio author={author} />
        </footer>
      </article>
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
        description
        tags
        author
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
