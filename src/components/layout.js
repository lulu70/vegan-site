import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header"
import Search from "./Search"
import { useSearchState } from "../context/ContextProvider"
import { MDXProvider } from "@mdx-js/react"
import RightColumn from "./RightColumn"
import styled from "styled-components"
import GlobalStyles from "../GlobalStyles"
import NutritionalValues from "./NutritionalValues"
import StyledLink from "./StyledLink"
import { MAIN_WIDTH, GREY, ASIDE_WIDTH } from "../constants"
import PrintView from "./PrintView"
import ExternalLink from "./ExternalLink"
const Container = styled.div``

const Main = styled.main`
  display: flex;
  justify-content: center;
  opacity: 1;
`
const CenterColumn = styled.div`
  width: ${MAIN_WIDTH};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  border-right: solid 1px ${GREY};
  border-left: solid 1px ${GREY};
  @media (max-width: 900px) {
    border: none;
  }
  @media (max-width: 600px) {
    width: 95%;
  }
`
const LeftColumn = styled.div`
  width: ${ASIDE_WIDTH};
  @media (max-width: 900px) {
    display: none;
  }
`
const Layout = ({ children, relatedPosts, author, noHeader }) => {
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
              nutritionalValues {
                title
                cal
                fat
                protein
                carbs
              }
              images {
                name
                childImageSharp {
                  fluid(maxWidth: 500, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
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
    NutritionalValues,
    Link: StyledLink,
    ExternalLink,
    PrintView,
  }

  return (
    <Container>
      <GlobalStyles />
      {!noHeader && <Header />}
      {searchVisibility && <Search posts={posts} />}
      <Main className="layout__main">
        <LeftColumn />
        <CenterColumn className="layout__centerColumn">
          <MDXProvider components={componentsForMdx}>{children}</MDXProvider>
        </CenterColumn>
        <RightColumn
          className="layout__rightColumn"
          relatedPosts={relatedPosts}
          author={author}
        />
      </Main>
    </Container>
  )
}

export default Layout
