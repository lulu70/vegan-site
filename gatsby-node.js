const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const recipeTemplate = path.resolve(`./src/templates/recipe-template.js`)
  createRedirect({ fromPath: "/app/print", toPath: "/app" })

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
  if (node.internal.type === `Mdx`) {
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
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // Only update the `/app` page.
  if (page.path.match(/^\/app/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/app/*"

    // Update the page.
    createPage(page)
  }
}
