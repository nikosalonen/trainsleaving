import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'

import 'spectre.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
            url
            thumbnail
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet title={data.site.siteMetadata.title}>

          <meta name="google-site-verification" content="NuRSgXGapEL_G85YfsVZiAUD46eJKguHaOcu9gwMT24" />
        </Helmet>

        <Header siteTitle={data.site.siteMetadata.title} />

        <div
          style={{
            margin: `0 auto`,
            maxWidth: 1050,
            //   padding: `0px 1.0875rem 1.45rem`,
            //   paddingTop: 0,
          }}
        >
          {children}
        </div>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
