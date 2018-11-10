import React from 'react'
import PropTypes from 'prop-types'

export default class ad extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-undef
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return <div />
  }
}

ad.propTypes = {
  google_ad_client: PropTypes.string.isRequired,
  enable_page_level_ads: PropTypes.string.isRequired,
}

ad.defaultProps = {
  className: ``,
  style: { display: `block` },
  format: `auto`,
  layout: ``,
  responsive: `false`,
}
