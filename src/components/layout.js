import React from "react"
import { useStaticQuery } from "gatsby"
import Header from "./Header"
import { rhythm } from "../utils/typography"
import Search from "./Search"
import { Context } from "../context/ContextProvider"
import { MDXProvider } from "@mdx-js/react"
import Image from "./Image"
import "../styles.css"
import RightSide from "./RightSide"
const Layout = ({ children, location, relatedPosts }) => {
  const [postContainerStyle, setPostContainerStyle] = React.useState(
    "layout__postContainer__fadeIn"
  )
  React.useEffect(() => {
    setPostContainerStyle("layout__postContainer__fadeIn")
    return () => {
      setPostContainerStyle("layout__postContainer__fadeOut")
    }
  }, [setPostContainerStyle])

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
              relatedPosts
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
        className={postContainerStyle}
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(40),
          display: "flex",
        }}
      >
        <main
          style={{
            flex: 3,
          }}
        >
          <MDXProvider components={componentsForMdx}>{children}</MDXProvider>
        </main>
        <div style={{ flex: 0.1 }}></div>
        <RightSide
          style={{ flex: 1 }}
          location={location}
          relatedPosts={relatedPosts}
          blueColor={blueColor}
        />
      </div>
    </>
  )
}

export default Layout
