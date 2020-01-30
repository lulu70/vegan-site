import React from "react"
import Bio from "./Bio"
import RelatedPosts from "./RelatedPosts"

const RightSide = ({ location, posts, blueColor }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isIndexPage = location.pathname === rootPath

  return isIndexPage ? (
    <span />
  ) : (
    <>
      <Bio />
      <hr />
      <RelatedPosts blueColor={blueColor} posts={posts} location={location} />
    </>
  )
}

export default RightSide
