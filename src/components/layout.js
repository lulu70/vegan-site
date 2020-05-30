import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header"
import Search from "./Search"
import { useSearchState } from "../context/ContextProvider"
import { MDXProvider } from "@mdx-js/react"
import Image from "./Image"
import RightSide from "./RightSide"
import styled from "styled-components"
import GlobalStyles from "../GlobalStyles"
import NutritionValues from "./NutritionValues"
import StyledLink from "./StyledLink"
import { MAIN_WIDTH, GREY } from "../constants"
import Gallery from "./Gallery"
import PrintView from "./PrintView"
const Container = styled.div``

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 1;
`
const LeftSide = styled.div`
  width: ${MAIN_WIDTH};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  border-right: solid 1px ${GREY};
  @media (max-width: 600px) {
    border-right: none;
    width: 95%;
  }
`
const Layout = ({ children, relatedPosts, author }) => {
  const searchState = useSearchState()
  const { searchVisibility } = searchState
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allFile(
        filter: { sourceInstanceName: { eq: "recipes" } }
        sort: { fields: childMdx___frontmatter___updatedDate, order: DESC }
      ) {
        nodes {
          childMdx {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              updatedDate(formatString: " MMMM DD, YYYY")
              title
              tags
              description
              nutritionValues {
                title
                cal
                fat
                protein
                carbs
              }
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

  const posts = data.allFile.nodes
  const componentsForMdx = {
    Image,
    NutritionValues,
    Gallery,
    Link: StyledLink,
    PrintView,
  }

  return (
    <Container>
      <GlobalStyles />
      <Header />
      {searchVisibility && <Search posts={posts} />}
      <Main className="layout__main">
        <LeftSide className="layout__leftSide">
          <MDXProvider components={componentsForMdx}>{children}</MDXProvider>
        </LeftSide>
        <RightSide
          className="layout__rightSide"
          relatedPosts={relatedPosts}
          author={author}
        />
      </Main>
    </Container>
  )
}

export default Layout
