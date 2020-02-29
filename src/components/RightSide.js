import React from "react"
// import Bio from "./bio"
import RelatedPosts from "./RelatedPosts"

const RightSide = ({ location, relatedPosts, style, className, author }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isIndexPage = location.pathname === rootPath

  return (
    <div style={style} className={className}>
      {isIndexPage ? (
        <span />
      ) : (
        <>
          {/* <Bio author={author} /> */}
          {relatedPosts && relatedPosts.length > 0 && (
            <RelatedPosts relatedPosts={relatedPosts} />
          )}
        </>
      )}
    </div>
  )
}

export default RightSide
