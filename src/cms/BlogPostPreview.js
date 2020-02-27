import React from "react"
import { MAIN_COLOR } from "../constants"
const BlogPostPreview = props => {
  const title = props.entry.getIn(["data", "title"])
  const date = props.entry.getIn(["data", "date"])
  const body = props.entry.getIn(["data", "body"])
  const bodyFor = props.widgetFor("body")

  console.log(bodyFor.props.value)
  return (
    <div className="container">
      <div
        className="header"
        style={{
          height: "100px",
          backgroundColor: MAIN_COLOR,
        }}
      />
      <article style={{ width: "100vh" }}>
        <header>
          <h1>{title}</h1>
          {/* <p>{date}</p> */}
        </header>
        <div>{body}</div>
        {/* <footer>
          <Bio />
        </footer> */}
      </article>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default BlogPostPreview
