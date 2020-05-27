import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostPreview from "../components/PostPreview"
import PostHeader from "../components/PostHeader"
import styled from "styled-components"

const Container = styled.div`
  padding: 1rem 1rem 0 0;
`
const Blog = ({ data, location }) => {
  const posts = data.allFile.nodes
  return (
    <Layout location={location}>
      <SEO title="Blog" />
      <PostHeader title={data.site.siteMetadata.blogTitle}></PostHeader>
      <Container>
        {posts.map((post) => {
          return <PostPreview post={post} key={post.childMdx.fields.slug} />
        })}
      </Container>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        blogTitle
      }
    }
    allFile(
      filter: { sourceInstanceName: { eq: "blog" } }
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
            updatedDate(formatString: "MMMM DD, YYYY")
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
`
