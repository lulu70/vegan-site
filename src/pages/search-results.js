import React from "react"
import Layout from "../components/layout"
import { Context } from "../context/ContextProvider"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import Divider from "../components/Divider"

const SearchResults = ({ data }) => {
  const { blueColor } = data.site.siteMetadata
  const { searchState } = React.useContext(Context)
  const { filteredPosts, query } = searchState
  return (
    <Layout>
      <Divider />
      <p>
        Your search for <strong>"{query}"</strong> returned{" "}
        {filteredPosts.length} {filteredPosts.length > 1 ? "results" : "result"}
        ...
      </p>
      {filteredPosts.length < 1 && (
        <span>Try searching for something else...</span>
      )}
      {filteredPosts.map(({ node }) => {
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

export default SearchResults
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
  }
`
