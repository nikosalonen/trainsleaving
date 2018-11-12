
import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const thanks = () => (
  <Layout>
    <div>
      <h1>Kiitos viestistä!</h1>

      <Link  to="/">Takaisin etusivulle</Link>
    </div>
  </Layout>
)

export default thanks
