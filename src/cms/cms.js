import CMS from "netlify-cms-app"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "mdxImage",
  // Visible label
  label: "MDXImage",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "src", label: "Image", widget: "image" },
    { name: "alt", label: "Alt text", widget: "string" },
    { name: "title", label: "Title", widget: "string" },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^mdxImage (\S+)$/,
  // Function to extract data elements from the regexp match
  //   fromBlock: function(match) {
  //     return {
  //       id: match[1],
  //     }
  //   },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<Image fileName="${obj.title}" />`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  //   toPreview: function(obj) {
  //     return `<pre>{JSON.stringify(${obj}, null, 2)}</pre>`
  //   },
})
