import React from "react"
import { Context } from "../context/ContextProvider"
import { setPosts, setQuery } from "../context/reducers.js/searchReducer"
import SearchIcon from "../../content/assets/search.svg"
import { rhythm } from "../utils/typography"
import { navigate } from "gatsby"

const SearchInput = ({ posts, greenColor }) => {
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
  const onFormSubmit = e => {
    e.preventDefault()
    query && navigate("/search-results")
  }
  return (
    <form onSubmit={onFormSubmit}>
      <label
        htmlFor="search"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          type="submit"
          style={{ backgroundColor: "transparent", border: 0, display: "flex" }}
          disabled={!query}
        >
          <SearchIcon />
        </button>
        <input
          style={{
            border: 0,
            backgroundColor: greenColor,
            borderRadius: rhythm(0.2),
          }}
          type="text"
          id="search"
          placeholder="Search..."
          onChange={handleInputChange}
          value={query}
        />
      </label>
    </form>
  )
}

export default SearchInput
