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
const Layout = ({ children, location, relatedPosts, full }) => {
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
              featuredImage
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
          flexWrap: "wrap",
          marginTop: rhythm(1),
          justifyContent: "space-between",
        }}
      >
        <main
          style={{
            flex: 3,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <MDXProvider components={componentsForMdx}>{children}</MDXProvider>
        </main>
        {!full && (
          <RightSide
            className="rightSide"
            style={{ flex: 1, paddingLeft: rhythm(1) }}
            location={location}
            relatedPosts={relatedPosts}
            blueColor={blueColor}
          />
        )}
      </div>
    </>
  )
}

export default Layout
