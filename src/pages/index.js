import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import PostHeader from "../components/PostHeader"

const index = ({ data }) => {
  return (
    <Layout>
      <SEO
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        image={data.site.siteMetadata.image}
      />
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
        description
        image
      }
    }
  }
`
