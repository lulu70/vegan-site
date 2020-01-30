import React from "react"
import { Link } from "gatsby"

const RelatedPosts = ({ blueColor, relatedPosts }) => {
  return (
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
}

export default RelatedPosts
