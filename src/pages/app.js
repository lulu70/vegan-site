import React from "react"
import { Router } from "@reach/router"
import PrintPage from "../components/PrintPage"

const App = ({ location }) => {
  return (
    <Router basepath="/app">
      <PrintPage
        path="/print"
        post={location.state ? location.state.post : {}}
      />
    </Router>
  )
}

export default App
