import React from "react"
import Layout from "../components/layout"

const Pantry = ({ location, data }) => {
  const nodes = data.allMdx.nodes

  return (
    <Layout full location={location}>
      Pantry
    </Layout>
  )
}

export default Pantry

export const pageQuery = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          ingredients
        }
      }
    }
  }
`
