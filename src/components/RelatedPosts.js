import React from "react"
import { Link } from "gatsby"

const RelatedPosts = ({ blueColor, posts, location }) => {
  const postsWithoutCurrentPost = posts.filter(
    ({ node }) => node.fields.slug !== location.pathname
  )
  const currentPost = posts.find(
    ({ node }) => node.fields.slug === location.pathname
  )
  const relatedPostsNames =
    currentPost && currentPost.node.frontmatter.relatedPosts
  const relatedPostsSlugs =
    relatedPostsNames && relatedPostsNames.map(name => "/" + name + "/")
  const relatedPosts =
    relatedPostsSlugs &&
    postsWithoutCurrentPost.filter(({ node }) => {
      return relatedPostsSlugs.includes(node.fields.slug)
    })
  return (
    relatedPosts &&
    relatedPosts.length > 0 && (
      <div>
        <h4 style={{ color: blueColor, marginTop: 0 }}>Related Posts:</h4>
        {relatedPosts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <React.Fragment key={node.fields.slug}>
              <header>
                <Link
                  style={{ boxShadow: `none`, color: blueColor }}
                  to={node.fields.slug}
                >
                  {title}
                </Link>
              </header>
              <hr />
            </React.Fragment>
          )
        })}
      </div>
    )
  )
}

export default RelatedPosts
