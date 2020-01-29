import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/Bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import BgImg from "../components/BgImg"
import { MDXRenderer } from "gatsby-plugin-mdx"
const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const bgImg = post.frontmatter.bgImg
  return (
    <BgImg img={bgImg}>
      <Layout location={location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          <MDXRenderer>{post.body}</MDXRenderer>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            <Bio />
          </footer>
        </article>
      </Layout>
    </BgImg>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        bgImg
        tags
      }
    }
  }
`
