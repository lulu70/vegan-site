import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import StyledLink from "../components/StyledLink"
import { graphql } from "gatsby"

const MainHeader = styled.h1`
  width: 100%;
  text-align: center;
  margin: ${rhythm(2)};
  color: ${props => props.color};
`

const index = ({ data, location }) => {
  return (
    <Layout full location={location}>
      <SEO title="Home" />
      <MainHeader className="index__mainHeader">
        {data.site.siteMetadata.title}
      </MainHeader>
      {data.pages.nodes.map(({ name, id }) => (
        <StyledLink key={id} className="index__linkToBlog" to={`/${name}`}>
          <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
        </StyledLink>
      ))}
    </Layout>
  )
}

export default index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    pages: allFile(
      filter: {
        sourceInstanceName: { eq: "pages" }
        name: { nin: ["404", "index"] }
      }
    ) {
      nodes {
        name
        id
      }
    }
  }
`
