import React from "react"
import { Context } from "../context/ContextProvider"
import { setPosts, setQuery } from "../context/reducers/searchReducer"
import { rhythm } from "../utils/typography"

const SearchInput = ({ posts, close, blueColor }) => {
  const { searchState, searchDispatch } = React.useContext(Context)
  const { query } = searchState

  const handleInputChange = event => {
    const query = event.target.value
    const filteredPosts = posts.filter(post => {
      const { description, title, tags } = post.node.frontmatter
      if (!query) return ""
      return (
        description.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        tags
          .join("")
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    })
    setPosts(searchDispatch, filteredPosts)
    setQuery(searchDispatch, query)
  }

  return (
    <label
      htmlFor="search"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: blueColor }}>Search The Website...</h1>
        <button
          onClick={() => {
            close()
          }}
          style={{
            backgroundColor: "transparent",
            border: 0,
            height: rhythm(1),
            cursor: "pointer",
          }}
        >
          close X
        </button>
      </div>
      <input
        style={{
          border: "solid 2px grey",
          borderRadius: rhythm(0.1),
          padding: rhythm(0.3),
        }}
        type="search"
        id="search"
        onChange={handleInputChange}
        value={query}
      />
    </label>
  )
}

export default SearchInput
