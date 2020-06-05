import React from "react"
import PrintView from "./PrintView"
import Layout from "./layout"
import styled from "styled-components"
import SEO from "./seo"

const Container = styled.div`
  padding: 1rem;
`

const PrintPage = ({ fileName }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  React.useEffect(() => {
    if (imageLoaded) {
      setImageLoaded(false)
      window.print()
    }
  }, [imageLoaded])
  return (
    <Layout noHeader>
      <SEO title="Print page" />
      <Container>
        <PrintView
          fileName={fileName}
          noPrintButton
          setImageLoaded={setImageLoaded}
        />
      </Container>
    </Layout>
  )
}

export default PrintPage
