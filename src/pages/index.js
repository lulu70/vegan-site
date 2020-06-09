import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import PostHeader from "../components/PostHeader"

const index = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title} />
      <PostHeader title={data.site.siteMetadata.title} />
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
  }
`
