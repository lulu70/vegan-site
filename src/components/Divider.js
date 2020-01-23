import React from "react"
import { rhythm } from "../utils/typography"
const Divider = ({ height = 1 }) => {
  return <div style={{ height: rhythm(height) }}></div>
}

export default Divider
