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
import "../styles.css"

const Search = ({ posts, blueColor }) => {
  const { searchState, searchDispatch } = React.useContext(Context)
  const { filteredPosts, query } = searchState

  const [scrollHeight, setScrollHeight] = React.useState(null)
  const [containerClassName, setContainerClassName] = React.useState(
    "search__container__fadeIn"
  )

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
    setContainerClassName("search__container__fadeOut")
    setTimeout(() => {
      resetSearchState(searchDispatch)
      setSearchVisibility(searchDispatch, false)
    }, 100)
  }
  return (
    <div
      className={containerClassName}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: scrollHeight,
        backgroundColor: "rgba(255,255,255,0.96)",
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
        <SearchInput posts={posts} close={close} blueColor={blueColor} />
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
