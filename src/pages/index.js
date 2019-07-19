import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/layout'

import App from '../components/app'
import SEO from '../components/seo'
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Lähtevät junat" keywords={
        [ `junat`,
          `lähijunat`,
          `kaukojunat`,
          `lähtevät junat`,
          `junat helsinki`,
          `junat tampere`,
          `junat tikkurila`,
          `junat pasila`,
          `junat oulu`, `juna aikataulut` ]
      } />
      <App />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage
