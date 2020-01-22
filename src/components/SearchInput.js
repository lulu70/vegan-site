import React from "react"
import { Context } from "../context/ContextProvider"
import { setPosts, setQuery } from "../context/reducers.js/searchReducer"
import SearchIcon from "../../content/assets/search.svg"
const SearchInput = ({ posts, greenColor }) => {
  const { searchDispatch } = React.useContext(Context)

  React.useEffect(() => {
    setPosts(searchDispatch, posts)
  }, [posts, searchDispatch])

  const handleInputChange = event => {
    const query = event.target.value
    const filteredPosts = posts.filter(post => {
      const { description, title, tags } = post.node.frontmatter
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
      }}
    >
      <SearchIcon />
      <input
        style={{ border: 0, backgroundColor: greenColor }}
        type="text"
        id="search"
        placeholder="Search..."
        onChange={handleInputChange}
      />
    </label>
  )
}

export default SearchInput
