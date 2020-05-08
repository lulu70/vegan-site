import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import PostPreview from "../components/PostPreview"
const MainHeader = styled.h1`
  width: 100%;
  text-align: center;
  margin: 3rem;
  color: ${props => props.color};
`
const Blog = ({ data, location }) => {
  const posts = data.allFile.nodes
  return (
    <Layout full location={location}>
      <SEO title="Blog" />
      <MainHeader className="blog__mainHeader">
        {data.site.siteMetadata.blogTitle}
      </MainHeader>
      {posts.map(post => {
        return <PostPreview post={post} key={post.childMdx.fields.slug} />
      })}
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
