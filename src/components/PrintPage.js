import React from "react"
import PrintView from "./PrintView"
import Layout from "./layout"
import styled from "styled-components"

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
