import React from "react"
import { useStaticQuery } from "gatsby"
import Header from "./Header"
import { rhythm } from "../utils/typography"

const Layout = ({ children }) => {
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
  `)

  const { title, subTitle, blueColor, greenColor } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges
  return (
    <>
      <Header
        title={title}
        subTitle={subTitle}
        blueColor={blueColor}
        greenColor={greenColor}
        posts={posts}
      />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
