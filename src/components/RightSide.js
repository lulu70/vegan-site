import React from "react"
import Bio from "./Bio"
import RelatedPosts from "./RelatedPosts"

const RightSide = ({ location, relatedPosts, blueColor, style }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isIndexPage = location.pathname === rootPath

  return (
    <div style={style}>
      {isIndexPage ? (
        <span />
      ) : (
        <>
          <Bio />
          {relatedPosts && relatedPosts.length > 0 && (
            <RelatedPosts blueColor={blueColor} relatedPosts={relatedPosts} />
          )}
        </>
      )}
    </div>
  )
}

export default RightSide
