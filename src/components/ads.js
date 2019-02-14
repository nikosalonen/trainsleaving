import * as React from "react"
import PropTypes from 'prop-types'

const Ads =  ({ client, slot }) => (
  <div>
    <ins className="adsbygoogle"
      data-ad-client={client}
      data-ad-slot={slot}
      style={{ display:`block` }}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
)

Ads.propTypes = {
  client: PropTypes.string,
  slot: PropTypes.string,
}


export default Ads
