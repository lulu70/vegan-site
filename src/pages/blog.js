import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/Image"
import styled from "styled-components"
import StyledLink from "../components/StyledLink"

const MainHeader = styled.h1`
  width: 100%;
  text-align: center;
  margin: 3rem;
  color: ${props => props.color};
`
const PostHeader = styled.h3`
  margin-bottom: 0.5rem;
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

const Blog = ({ data, location }) => {
  const posts = data.allFile.nodes
  return (
    <Layout full location={location}>
      <SEO title="Blog" />
      <MainHeader className="blog__mainHeader">
        {data.site.siteMetadata.blogTitle}
      </MainHeader>
      {posts.map(post => {
        const title =
          post.childMdx.frontmatter.title || post.childMdx.fields.slug
        return (
          <Article className="blog__article" key={post.childMdx.fields.slug}>
            <StyledLink
              className="blog__featuredImageLink"
              to={post.childMdx.fields.slug}
            >
              <Image
                filename={post.childMdx.frontmatter.featuredImage.src.name}
              />
            </StyledLink>
            <header>
              <PostHeader className="blog__postHeader">
                <StyledLink
                  className="blog__postHeaderLink"
                  to={post.childMdx.fields.slug}
                >
                  {title}
                </StyledLink>
              </PostHeader>
              <small>
                {post.childMdx.frontmatter.date ===
                post.childMdx.frontmatter.updatedDate
                  ? post.childMdx.frontmatter.date
                  : `Updated at: ${post.childMdx.frontmatter.updatedDate}`}
              </small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    post.childMdx.frontmatter.description ||
                    post.childMdx.excerpt,
                }}
              />
            </section>
          </Article>
        )
      })}
      <Article className="blog__lastArticle" />
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
