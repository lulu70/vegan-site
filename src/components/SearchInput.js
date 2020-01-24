import React from "react"
import { Context } from "../context/ContextProvider"
import { setPosts, setQuery } from "../context/reducers/searchReducer"
import { rhythm } from "../utils/typography"

const SearchInput = ({ posts }) => {
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
        alignItems: "center",
        flex: 1,
      }}
    >
      <input
        style={{
          border: "solid 2px grey",
          borderRadius: rhythm(0.3),
          flex: 1,
        }}
        type="text"
        id="search"
        placeholder="Search..."
        onChange={handleInputChange}
        value={query}
      />
    </label>
  )
}

export default SearchInput
