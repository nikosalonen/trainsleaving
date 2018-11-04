import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/layout'

import App from '../components/app'

const IndexPage = () => {
  return (
    <Layout>
      <App />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage
