import React from "react"
import { Router } from "@reach/router"
import PrintPage from "../components/PrintPage"

const App = () => {
  return (
    <Router basepath="/app">
      <PrintPage path="/print/:fileName" />
    </Router>
  )
}

export default App
