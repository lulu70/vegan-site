import React from "react"
import { Context } from "../context/ContextProvider"
import {
  setSearchVisibility,
  resetSearchState,
  setPosts,
} from "../context/reducers/searchReducer"
import { rhythm } from "../utils/typography"
import SearchInput from "./SearchInput"
import { Link } from "gatsby"
import debounce from "lodash.debounce"
const Search = ({ posts, blueColor }) => {
  const { searchState, searchDispatch } = React.useContext(Context)
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
    <div
      style={{
        width: "100%",
        height: scrollHeight,
        backgroundColor: "rgba(255,255,255,0.96)",
        position: "absolute",
        left: 0,
        top: 0,
        display: "flex",
        justifyContent: "center",
        color: "black",
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: rhythm(30),
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", marginTop: rhythm(1) }}>
          <SearchInput posts={posts} />
          <button
            onClick={() => {
              close()
            }}
            style={{
              backgroundColor: "transparent",
              border: 0,
              height: rhythm(1),
            }}
          >
            close X
          </button>
        </div>

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
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link
                    style={{ boxShadow: `none`, color: blueColor }}
                    to={node.fields.slug}
                    onClick={() => {
                      close()
                    }}
                  >
                    {title}
                  </Link>
                </h3>
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
          )
        })}
      </div>
    </div>
  )
}

export default Search
