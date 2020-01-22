import React from "react"
// import { Link } from "gatsby"
import Header from "./Header"
import { rhythm } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { title, subTitle, children, blueColor } = this.props
    // const rootPath = `${__PATH_PREFIX__}/`
    // let header

    // if (location.pathname === rootPath) {
    //   header = (
    //     <>
    //       <h1
    //         style={{
    //           ...scale(1.5),
    //           marginBottom: rhythm(1.5),
    //           marginTop: 0,
    //         }}
    //       >
    //         <Link
    //           style={{
    //             boxShadow: `none`,
    //             textDecoration: `none`,
    //             color: `inherit`,
    //           }}
    //           to={`/`}
    //         >
    //           {title}
    //         </Link>
    //       </h1>
    //       <h3>{subTitle}</h3>
    //     </>
    //   )
    // } else {
    //   header = (
    //     <>
    //       <h3
    //         style={{
    //           fontFamily: `Montserrat, sans-serif`,
    //           marginTop: 0,
    //         }}
    //       >
    //         <Link
    //           style={{
    //             boxShadow: `none`,
    //             textDecoration: `none`,
    //             color: `inherit`,
    //           }}
    //           to={`/`}
    //         >
    //           {title}
    //         </Link>
    //       </h3>
    //       <h5>{subTitle}</h5>
    //     </>
    //   )
    // }
    return (
      <>
        <Header title={title} subTitle={subTitle} blueColor={blueColor} />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
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
