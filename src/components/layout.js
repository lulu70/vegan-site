import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header"
import { rhythm } from "../utils/typography"
import Search from "./Search"
import { Context } from "../context/ContextProvider"
import { MDXProvider } from "@mdx-js/react"
import Image from "./Image"
import RightSide from "./RightSide"
import styled from "styled-components"
import { MAIN_COLOR } from "../constants"
const PostContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(40)};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  opacity: 1;
  animation: fadeIn 0.2s ease-in;
  img {
    object-fit: cover;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`
const Main = styled.main`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 20rem 0 0;
  @media (max-width: 900px) {
    margin: 0 1rem;
  }
  .gatsby-resp-image-wrapper {
    width: 80%;
    @media (max-width: 900px) {
      width: 100%;
    }
  }
`
const StyledRightSide = styled(RightSide)`
  flex: 1;
  padding-left: ${rhythm(1)};

  @media (max-width: 900px) {
    display: none;
  }
`
const Layout = ({ children, location, relatedPosts, full, author }) => {
  const { searchState } = React.useContext(Context)
  const { searchVisibility } = searchState
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
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
              tags
              featuredImage {
                src {
                  name
                }
              }
            }
          }
        }
      }
    }
  `)

  const posts = data.allMdx.edges
  const componentsForMdx = { Image }

  return (
    <>
      <Header color={MAIN_COLOR} />
      {searchVisibility && <Search posts={posts} />}
      <PostContainer className="layout__postContainer">
        <Main className="layout__main">
          <MDXProvider components={componentsForMdx}>{children}</MDXProvider>
        </Main>
        {!full && (
          <StyledRightSide
            className="layout__rightSide"
            location={location}
            relatedPosts={relatedPosts}
            author={author}
          />
        )}
      </PostContainer>
    </>
  )
}

export default Layout
