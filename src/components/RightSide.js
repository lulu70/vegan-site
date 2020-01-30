import React from "react"
import Bio from "./Bio"
import RelatedPosts from "./RelatedPosts"

const RightSide = ({ location, relatedPosts, blueColor }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isIndexPage = location.pathname === rootPath

  return isIndexPage ? (
    <span />
  ) : (
    <>
      <Bio />
      <hr />
      {relatedPosts && relatedPosts.length > 0 && (
        <RelatedPosts blueColor={blueColor} relatedPosts={relatedPosts} />
      )}
    </>
  )
}

export default RightSide
