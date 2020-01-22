import React from "react"
import { Link, graphql } from "gatsby"
import { Context } from "../context/ContextProvider"
// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const {
    title: siteTitle,
    subTitle: siteSubTitle,
    blueColor,
    greenColor,
  } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges
  const { searchState } = React.useContext(Context)
  const hasSearchResults = searchState.filteredPosts && searchState.query !== ""
  const postsToRender = hasSearchResults ? searchState.filteredPosts : posts
  return (
    <Layout
      location={location}
      title={siteTitle}
      subTitle={siteSubTitle}
      blueColor={blueColor}
      greenColor={greenColor}
      posts={posts}
    >
      <SEO title="All posts" />
      {/* <Bio /> */}
      {searchState.filteredPosts.length < 1 && (
        <p style={{ marginTop: rhythm(1) }}>
          There were no results found for: <strong>{searchState.query}.</strong>
          <br />
          Try searching for something else...
        </p>
      )}
      {postsToRender.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
          }
        }
      }
    }
  }
`
