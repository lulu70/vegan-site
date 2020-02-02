import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Image from "../components/Image"
const BlogIndex = ({ data, location }) => {
  const { blueColor } = data.site.siteMetadata
  const posts = data.allMdx.edges
  return (
    <Layout full location={location}>
      <SEO title="All posts" />
      <h1
        style={{
          width: "100%",
          textAlign: "center",
          margin: rhythm(2),
          color: blueColor,
        }}
      >
        A SIMPLE TECH AND LIFESTYLE BLOG
      </h1>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article className="index__article" key={node.fields.slug}>
            <Link
              style={{ boxShadow: `none`, color: blueColor }}
              to={node.fields.slug}
            >
              <Image fileName={node.frontmatter.featuredImage} />
            </Link>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link
                  style={{ boxShadow: `none`, color: blueColor }}
                  to={node.fields.slug}
                >
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
      <article className="index__article__after" />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        subTitle
        blueColor
        greenColor
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
            bgImg
            tags
            featuredImage
          }
        }
      }
    }
  }
`
