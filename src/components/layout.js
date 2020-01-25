import React from "react"
import { useStaticQuery } from "gatsby"
import Header from "./Header"
import { rhythm } from "../utils/typography"
import Search from "./Search"
import { Context } from "../context/ContextProvider"
import { MDXProvider } from "@mdx-js/react"
import Image from "./Image"

const Layout = ({ children }) => {
  const { searchState } = React.useContext(Context)
  const { searchVisibility } = searchState
  const data = useStaticQuery(graphql`
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
            }
          }
        }
      }
    }
  `)

  const { blueColor } = data.site.siteMetadata
  const posts = data.allMdx.edges
  const componentsForMdx = { Image }
  return (
    <>
      <Header color={blueColor} />
      {searchVisibility && <Search blueColor={blueColor} posts={posts} />}
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
        }}
      >
        <main>
          <MDXProvider components={componentsForMdx}>{children}</MDXProvider>
        </main>
      </div>
    </>
  )
}

export default Layout
