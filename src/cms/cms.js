import CMS from "netlify-cms-app"
import React from "react"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "mdxImage",
  // Visible label
  label: "MDXImage",
  // Fields the user need to fill out when adding an instance of the component
  fields: [{ name: "src", label: "Image", widget: "image" }],
  // Pattern to identify a block as being an instance of this component
  pattern: /\w/,
  //   // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    console.log(match)
    return {
      title: match,
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    const fileName = obj.src
      ? obj.src.replace("../assets/images/", "").split(".")[0]
      : ""
    return `<Image fileName="${fileName}" />`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: obj => {
    return <div style={{ color: "red" }}>To preview</div>
  },
})
