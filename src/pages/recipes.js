import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import PostPreview from "../components/PostPreview"
import PostHeader from "../components/PostHeader"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem 1rem 0 1rem;
  @media (max-width: 900px) {
    padding: 1rem 0 0 0;
  }
`
const Recipes = ({ data, location }) => {
  const posts = data.allFile.nodes
  return (
    <Layout location={location}>
      <SEO title="Recipes" />
      <PostHeader title={data.site.siteMetadata.recipesTitle} />
      <Container>
        {posts.map((post) => {
          return <PostPreview post={post} key={post.childMdx.fields.slug} />
        })}
      </Container>
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
            nutritionValues {
              title
              cal
              protein
              carbs
              fat
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
`
