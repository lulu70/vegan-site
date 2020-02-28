import React from "react"
import RelatedPosts from "./RelatedPosts"

const RightSide = ({ location, relatedPosts, style, className }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isIndexPage = location.pathname === rootPath

  return (
    <div style={style} className={className}>
      {isIndexPage ? (
        <span />
      ) : (
        <>
          {relatedPosts && relatedPosts.length > 0 && (
            <RelatedPosts relatedPosts={relatedPosts} />
          )}
        </>
      )}
    </div>
  )
}

export default RightSide
