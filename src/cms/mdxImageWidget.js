import React from "react"
export default {
  // Internal id of the component
  id: "mdxImage",
  // Visible label
  label: "MDXImage",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "src", label: "Image", widget: "image" },
    { label: "Small", name: "small", widget: "boolean", default: false },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<Image filename=".*" small={.+} \/>/,
  //   // Function to extract data elements from the regexp match
  fromBlock: function(pattern) {
    const matchSmall = pattern[0].match(/{.+}/)[0]
    const smallValue = matchSmall.slice(1, matchSmall.length - 1)
    const matchFlieName = pattern[0].match(/".+"/)
      ? pattern[0].match(/".+"/)[0]
      : ""
    const fileName = matchFlieName.slice(1, matchFlieName.length - 1)

    return {
      match: pattern[0],
      smallValue,
      fileName,
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    const fileName = obj.src
      ? obj.src.replace("../assets/images/", "").split(".")[0]
      : ""
    return `<Image filename="${fileName}" small={${obj.small}} />`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: ({ smallValue, fileName }) => {
    const body = document.querySelector(".Pane2")
    const width = body.offsetWidth
    return (
      <img
        alt="placeholder-api"
        src={`https://via.placeholder.com/${
          smallValue === "true"
            ? parseInt(width / 2)
            : parseInt(width - parseInt(width / 10))
        }?text=${fileName}`}
      />
    )
  },
}
