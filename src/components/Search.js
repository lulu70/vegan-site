import React from "react"
import { useSearchState, useSearchDispatch } from "../context/ContextProvider"
import {
  setSearchVisibility,
  resetSearchState,
  setPosts,
} from "../context/reducers/searchReducer"
import SearchInput from "./SearchInput"
import debounce from "lodash.debounce"
import styled from "styled-components"
import { BG_COLOR, MAIN_WIDTH } from "../constants"
import PostPreview from "./PostPreview"

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: ${BG_COLOR};
  display: flex;
  justify-content: center;
  color: black;
  z-index: 2;
  opacity: 1;
`
const InnerContainer = styled.div`
  width: ${MAIN_WIDTH};
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    width: 95%;
  }
`
const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: ${BG_COLOR};
  z-index: 1;
`
const Divider = styled.div`
  height: 1.3rem;
`
const PreviewsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Search = ({ posts }) => {
  const searchState = useSearchState()
  const searchDispatch = useSearchDispatch()
  const { filteredPosts, query } = searchState

  const [scrollHeight, setScrollHeight] = React.useState(null)

  React.useEffect(() => {
    if (!query) {
      setPosts(searchDispatch, posts)
    }
  }, [posts, searchDispatch, query])
  React.useEffect(() => {
    setScrollHeight(document.body.scrollHeight)
    const handleResize = () => {
      setScrollHeight(document.body.scrollHeight)
    }
    window.addEventListener("resize", debounce(handleResize, 500))
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [searchDispatch])
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const close = () => {
    resetSearchState(searchDispatch)
    setSearchVisibility(searchDispatch, false)
  }
  return (
    <Container
      className="search__container"
      style={{ height: scrollHeight }}
      role="search"
    >
      <InnerContainer className="search__innerContainer">
        <StickyContainer>
          <SearchInput posts={posts} close={close} />
          {query && (
            <>
              <div>
                Your search for <strong>"{query}"</strong> returned{" "}
                {filteredPosts.length}{" "}
                {filteredPosts.length > 1 ? "results" : "result"}
                ...
              </div>
              {filteredPosts.length < 1 && (
                <span>Try searching for something else...</span>
              )}
            </>
          )}
          <Divider />
        </StickyContainer>
        <PreviewsContainer>
          {filteredPosts.map((post) => {
            const formattedPost = { childMdx: post }
            return (
              <PostPreview
                post={formattedPost}
                key={post.fields.slug}
                onClick={close}
              />
            )
          })}
        </PreviewsContainer>
      </InnerContainer>
    </Container>
  )
}

export default Search
