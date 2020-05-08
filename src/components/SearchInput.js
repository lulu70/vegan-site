import React from "react"
import { useSearchState, useSearchDispatch } from "../context/ContextProvider"
import { setPosts, setQuery } from "../context/reducers/searchReducer"
import styled from "styled-components"

const Label = styled.label`
  display: flex;
  flex-direction: column;
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CloseButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
`
const Input = styled.input`
  border: solid 2px grey;
  padding: 0.5rem;
`

const SearchInput = ({ posts, close }) => {
  const searchState = useSearchState()
  const searchDispatch = useSearchDispatch()
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
    <Label htmlFor="search" className="searchInput__label">
      <Container className="searchInput__container">
        <h1 className="searchInput__header">Search...</h1>
        <CloseButton
          onClick={() => {
            close()
          }}
          className="searchInput__closeButton"
        >
          close X
        </CloseButton>
      </Container>
      <Input
        className="searchInput__input"
        type="search"
        id="search"
        onChange={handleInputChange}
        value={query}
      />
    </Label>
  )
}

export default SearchInput
