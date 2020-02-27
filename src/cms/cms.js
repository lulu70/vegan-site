import CMS from "netlify-cms-app"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "mdxImage",
  // Visible label
  label: "MDXImage",
  // Fields the user need to fill out when adding an instance of the component
  fields: [{ name: "src", label: "Image", widget: "image" }],
  // Pattern to identify a block as being an instance of this component
  // pattern: /<Image fileName=".+" \/>/,
  //   // Function to extract data elements from the regexp match
  // fromBlock: function(match) {
  //   return {
  //     match: match[0],
  //   }
  // },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    const fileName = obj.src
      ? obj.src.replace("../assets/images/", "").split(".")[0]
      : ""
    return `<Image fileName="${fileName}" />`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  // toPreview: ({ match }) => {
  //   const fileName = match.replace('<Image fileName="', "").split('"')[0]
  //   const src = "../assets/images/" + fileName + ".jpg"
  //   console.log(src)
  //   return "photo"
  // },
})
