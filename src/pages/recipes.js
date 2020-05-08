import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import { graphql } from "gatsby"
import PostPreview from "../components/PostPreview"
const MainHeader = styled.h1`
  width: 100%;
  text-align: center;
  margin: 3rem;
  color: ${props => props.color};
`
const Recipes = ({ data, location }) => {
  const posts = data.allFile.nodes
  return (
    <Layout full location={location}>
      <SEO title="Blog" />
      <MainHeader className="recipes__mainHeader">
        {data.site.siteMetadata.recipesTitle}
      </MainHeader>
      {posts.map(post => {
        return <PostPreview post={post} key={post.childMdx.fields.slug} />
      })}
    </Layout>
  )
}

export default Recipes

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        recipesTitle
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
