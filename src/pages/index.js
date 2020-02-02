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
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article
            key={node.fields.slug}
            style={{ width: "30%", margin: rhythm(0.2) }}
          >
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
      <div className="after" style={{ width: "30%" }} />
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
