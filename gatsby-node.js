const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const recipeTemplate = path.resolve(`./src/templates/recipe-template.js`)

  const result = await graphql(
    `
      {
        allFile(
          filter: { sourceInstanceName: { in: ["recipes"] } }
          sort: { fields: childMdx___frontmatter___updatedDate, order: DESC }
          limit: 1000
        ) {
          nodes {
            childMdx {
              fields {
                slug
              }
              frontmatter {
                title
                tags
                author
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allFile.nodes

  posts.forEach((post) => {
    createPage({
      path: post.childMdx.fields.slug,
      component: recipeTemplate,
      context: {
        slug: post.childMdx.fields.slug,
        tags: post.childMdx.frontmatter.tags,
        author: post.childMdx.frontmatter.author,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx` || node.sourceInstanceName === "pages") {
    const fileNode = getNode(node.parent)
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value:
        node.internal.type === `Mdx`
          ? `/${fileNode.sourceInstanceName}${value}`
          : value,
    })
  }
}
