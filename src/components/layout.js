import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header"
import Search from "./Search"
import { useSearchState } from "../context/ContextProvider"
import { MDXProvider } from "@mdx-js/react"
import Image from "./Image"
import RightSide from "./RightSide"
import styled from "styled-components"
import { WIDTH } from "../constants"
import GlobalStyles from "../GlobalStyles"
import NutritionValues from "./NutritionValues"
import StyledLink from "./StyledLink"
const Container = styled.div``

const Main = styled.main`
  max-width: ${WIDTH};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  opacity: 1;
  animation: fadeIn 0.2s ease-in;
  margin: 0 2rem;
  @media (max-width: 900px) {
    margin: 0 1rem;
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
const LeftSide = styled.div`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const StyledRightSide = styled(RightSide)`
  flex: 1;
  @media (max-width: 900px) {
    display: none;
  }
`
const Layout = ({ children, location, relatedPosts, full, author }) => {
  const searchState = useSearchState()
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
  const componentsForMdx = { Image, NutritionValues, Link: StyledLink }

  return (
    <Container>
      <GlobalStyles />
      <Header />
      {searchVisibility && <Search posts={posts} />}
      <Main className="layout__main">
        <LeftSide className="layout__leftSide">
          <MDXProvider components={componentsForMdx}>{children}</MDXProvider>
        </LeftSide>
        {!full && (
          <StyledRightSide
            className="layout__rightSide"
            location={location}
            relatedPosts={relatedPosts}
            author={author}
          />
        )}
      </Main>
    </Container>
  )
}

export default Layout
