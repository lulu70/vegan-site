import React from "react"
import { useSearchState, useSearchDispatch } from "../context/ContextProvider"
import {
  setSearchVisibility,
  resetSearchState,
  setPosts,
} from "../context/reducers/searchReducer"
import { rhythm } from "../utils/typography"
import SearchInput from "./SearchInput"
import debounce from "lodash.debounce"
import Image from "../components/Image"
import styled from "styled-components"
import StyledLink from "./StyledLink"

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.96);
  display: flex;
  justify-content: center;
  color: black;
  z-index: 1;

  opacity: 1;
  animation: fadeIn 0.1s ease-in;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`
const InnerContainer = styled.div`
  width: ${rhythm(40)};
  display: flex;
  flex-direction: column;
`
const PostContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const PostHeader = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`
const FeaturedImage = styled(Image)`
  width: 150px;
  margin-left: ${rhythm(1)};
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
  const close = () => {
    resetSearchState(searchDispatch)
    setSearchVisibility(searchDispatch, false)
  }
  return (
    <Container className="search__container" style={{ height: scrollHeight }}>
      <InnerContainer className="search__innerContainer">
        <SearchInput posts={posts} close={close} />
        {query && (
          <>
            <p>
              Your search for <strong>"{query}"</strong> returned{" "}
              {filteredPosts.length}{" "}
              {filteredPosts.length > 1 ? "results" : "result"}
              ...
            </p>
            {filteredPosts.length < 1 && (
              <span>Try searching for something else...</span>
            )}
          </>
        )}
        {filteredPosts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <PostContainer
              key={node.fields.slug}
              className="search__postContainer"
            >
              <article>
                <header>
                  <PostHeader className="search__postHeader">
                    <StyledLink
                      className="search__postHeaderLink"
                      to={node.fields.slug}
                      onClick={close}
                    >
                      {title}
                    </StyledLink>
                  </PostHeader>
                  <small>{node.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </section>
              </article>
              <StyledLink
                to={node.fields.slug}
                onClick={close}
                className="search__featuredImageLink"
              >
                <FeaturedImage
                  filename={node.frontmatter.featuredImage.src.name}
                  className="search__featuredImage"
                />
              </StyledLink>
            </PostContainer>
          )
        })}
      </InnerContainer>
    </Container>
  )
}

export default Search
