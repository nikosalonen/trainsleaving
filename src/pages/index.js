import React from 'react'
import PropTypes from 'prop-types'

// import { graphql } from "gatsby"
import Time from '../components/time'
import Trains from '../components/trains'
import Settings from '../components/settings'
import Layout from '../components/layout'

const IndexPage = () => {
  return (
    <Layout>
      <Time />
      <Settings />
      <Trains />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage
