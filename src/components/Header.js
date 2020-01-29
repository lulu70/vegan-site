import React from "react"
import { scale, rhythm } from "../utils/typography"
import { Link } from "gatsby"
import Logo from "../../content/assets/Logo.svg"
import SearchIcon from "../../content/assets/search.svg"
import { Context } from "../context/ContextProvider"
import { setSearchVisibility } from "../context/reducers/searchReducer"
const Header = ({ color, style }) => {
  const { searchState, searchDispatch } = React.useContext(Context)
  const { searchVisibility } = searchState
  return (
    <header
      style={{
        ...scale(0.1),
        padding: `${rhythm(0.5)} ${rhythm(3 / 4)}`,
        borderBottom: "1px solid grey ",
        backgroundColor: color,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          alignItems: "center",
          color: "white",
          justifyContent: "space-between",
        }}
      >
        <Link
          to={`/`}
          aria-label="home"
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
        >
          <Logo style={{ width: "200px" }} />
        </Link>

        {!searchVisibility && (
          <button
            type="submit"
            aria-label="search"
            style={{
              backgroundColor: "transparent",
              border: 0,
              display: "flex",
              cursor: "pointer",
            }}
            onClick={() => {
              setSearchVisibility(searchDispatch, true)
            }}
          >
            <SearchIcon />
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
