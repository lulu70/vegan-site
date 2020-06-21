import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import PostHeader from "../components/PostHeader"
import { MAIN_FONT_SIZE, SECOND_COLOR, GREY } from "../constants"
import NutritionalValues from "../components/NutritionalValues"
import Gallery from "../components/Gallery"
import PrintView from "../components/PrintView"

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
const RecipeTemplate = ({ data, location, pageContext }) => {
  const post = data.mdx
  const author = data.author
  const relatedPosts = data.relatedPosts.edges.filter(
    (edge) => edge.node.fields.slug !== pageContext.slug
  )

  const images = post.frontmatter.images
  return (
    <Layout location={location} relatedPosts={relatedPosts} author={author}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={post.frontmatter.images[0]}
        author={author}
        date={post.frontmatter.date}
        updatedDate={post.frontmatter.updatedDate}
        nutritionalValues={post.frontmatter.ingredients[0].nutritionalValues}
        recipeIngredients={post.frontmatter.ingredients.reduce((acc, list) => {
          return [...acc, ...list.items]
        }, [])}
        recipeInstructions={post.frontmatter.instructions.reduce(
          (acc, list) => {
            return [...acc, ...list.items]
          },
          []
        )}
        recipe
      />
      <Article>
        <PostHeader post={post} />
        <MdxWrapper>
          <NutritionalValues
            values={post.frontmatter.ingredients[0].nutritionalValues}
          />
          <JumpToRecipeLink href="#printView__innerContainer">
            Jump to recipe
          </JumpToRecipeLink>
          <Gallery images={images} />
          <MDXRenderer>{post.body}</MDXRenderer>
          <PrintView post={post} />
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
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        updatedDate(formatString: "MMMM DD, YYYY")
        description
        tags
        author
        ingredients {
          nutritionalValues {
            title
            servingsText
            cal
            fat
            protein
            carbs
          }
          title
          items
        }
        instructions {
          title
          items
        }
        images {
          name
          publicURL
          childImageSharp {
            original {
              width
              height
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
      filter: { frontmatter: { tags: { in: $tags } } }
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
