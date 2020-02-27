import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Image from "../components/Image"
import styled from "styled-components"
import StyledLink from "../components/StyledLink"

const MainHeader = styled.h1`
  width: 100%;
  text-align: center;
  margin: ${rhythm(2)};
  color: ${props => props.color};
`
const PostHeader = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`

const Article = styled.article`
  @media (min-width: 900px) {
    width: 30%;
  }

  @media (max-width: 900px) {
    width: 45%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`

const BlogIndex = ({ data, location }) => {
  const posts = data.allMdx.edges
  return (
    <Layout full location={location}>
      <SEO title="All posts" />
      <MainHeader className="index__mainHeader">
        A SIMPLE TECH AND LIFESTYLE BLOG
      </MainHeader>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Article className="index__article" key={node.fields.slug}>
            <StyledLink
              className="index__featuredImageLink"
              to={node.fields.slug}
            >
              <Image fileName={node.frontmatter.featuredImage.src.name} />
            </StyledLink>
            <header>
              <PostHeader className="index__postHeader">
                <StyledLink
                  className="index__postHeaderLink"
                  to={node.fields.slug}
                >
                  {title}
                </StyledLink>
              </PostHeader>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </Article>
        )
      })}
      <Article className="index__lastArticle" />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        subTitle
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
            bgImg
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
