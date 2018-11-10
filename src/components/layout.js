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
          <html lang="fi" />
          <meta name="title" content={data.site.siteMetadata.title} />
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />
          <meta name="og:title" content={data.site.siteMetadata.title} />
          <meta name="og:url" content={data.site.siteMetadata.url} />
          <meta
            name="og:image"
            content={
              data.site.siteMetadata.thumbnail &&
              data.site.siteMetadata.thumbnail
            }
          />
          <meta
            name="og:image:secure_url"
            content={
              data.site.siteMetadata.thumbnail &&
              data.site.siteMetadata.thumbnail
            }
          />
          <meta
            name="og:description"
            content={data.site.siteMetadata.description}
          />
          <meta name="og:image:width" content={1200} />
          <meta name="og:image:height" content={630} />
          <meta name="twitter:card" content={`summary_large_image`} />
          <meta name="twitter:title" content={data.site.siteMetadata.title} />
          <meta
            name="twitter:description"
            content={data.site.siteMetadata.description}
          />
          <meta
            name="twitter:image"
            content={
              data.site.siteMetadata.thumbnail &&
              data.site.siteMetadata.thumbnail
            }
          />
          <meta name="robots" content={`index, follow`} />
          <meta name="twitter:creator" content={`@nikosalonen`} />
          <meta name="og:site_name" content={`lahtevat.info`} />
        </Helmet>

        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
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
