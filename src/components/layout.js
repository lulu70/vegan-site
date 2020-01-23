import React from "react"
// import { Link } from "gatsby"
import Header from "./Header"
import { rhythm } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const {
      title,
      subTitle,
      children,
      blueColor,
      greenColor,
      posts,
    } = this.props
    return (
      <>
        <Header
          title={title}
          subTitle={subTitle}
          blueColor={blueColor}
          greenColor={greenColor}
          posts={posts}
        />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(30),
          }}
        >
          {/* <header>{header}</header> */}
          <main>{children}</main>
        </div>
      </>
    )
  }
}

export default Layout
