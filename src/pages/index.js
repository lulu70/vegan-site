import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import StyledLink from "../components/StyledLink"
import { graphql } from "gatsby"
import { makePretty } from "../utils/helpers"
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
      {data.pages.nodes.map(({ name, fields, id }) => (
        <StyledLink key={id} className="index__linkToBlog" to={fields.slug}>
          <h2>{makePretty(name)}</h2>
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
        fields {
          slug
        }
      }
    }
  }
`
