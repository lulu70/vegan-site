import React from "react"
import { scale, rhythm } from "../utils/typography"
import { Link } from "gatsby"
import Logo from "../../content/assets/Logo.svg"
import SearchInput from "./SearchInput"
const Header = ({ subTitle, blueColor, greenColor, posts }) => {
  return (
    <header
      style={{
        ...scale(0.1),
        padding: `${rhythm(0.5)} ${rhythm(3 / 4)}`,
        borderBottom: "1px solid grey ",
        backgroundColor: blueColor,
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
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
        >
          <Logo style={{ width: "200px" }} />
        </Link>
        <div
          style={{
            fontSize: rhythm(0.3),
            padding: `${rhythm(0.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {subTitle}
        </div>
        {posts && <SearchInput posts={posts} greenColor={greenColor} />}
      </div>
    </header>
  )
}

export default Header
