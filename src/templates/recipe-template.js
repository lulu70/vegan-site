import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import PostHeader from "../components/PostHeader"
import { MAIN_FONT_SIZE, SECOND_COLOR, GREY } from "../constants"
import NutritionValues from "../components/NutritionValues"
import Gallery from "../components/Gallery"

const Article = styled.article`
  width: 100%;
  @media (max-width: 900px) {
    margin: 0;
  }
`
const JumpToRecipeLink = styled.a`
  color: ${SECOND_COLOR};
  background-color: ${GREY};
  display: inline-flex;
  padding: 0.2rem;
  margin-bottom: 0.5rem;
`
const MdxWrapper = styled.div`
  padding: 1rem 1rem 0 1rem;
  font-size: ${MAIN_FONT_SIZE};
  margin-bottom: 1rem;
  @media (max-width: 900px) {
    padding: 1rem 0 0 0;
  }
`
const RecipeTemplate = ({ data, location }) => {
  const post = data.mdx
  const author = data.author
  const relatedPosts = data.relatedPosts.edges
  const images = post.frontmatter.images
  return (
    <Layout location={location} relatedPosts={relatedPosts} author={author}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Article>
        <PostHeader post={post} />
        <MdxWrapper>
          <NutritionValues values={post.frontmatter.nutritionValues} />
          <JumpToRecipeLink href="#printView__innerContainer">
            Jump to recipe
          </JumpToRecipeLink>
          <Gallery images={images} />
          <MDXRenderer>{post.body}</MDXRenderer>
        </MdxWrapper>
      </Article>
    </Layout>
  )
}

export default RecipeTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $tags: [String], $author: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        updatedDate(formatString: "MMMM DD, YYYY")
        description
        tags
        author
        nutritionValues {
          servingsText
          title
          cal
          fat
          protein
          carbs
        }
        images {
          name
          childImageSharp {
            original {
              src
            }
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
    author: authorsJson(title: { eq: $author }) {
      title
      image {
        name
        childImageSharp {
          fluid(maxWidth: 500, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
    relatedPosts: allMdx(
      filter: {
        frontmatter: { tags: { in: $tags } }
        fields: { slug: { ne: $slug } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
