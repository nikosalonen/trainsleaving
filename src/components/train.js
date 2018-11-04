import React from 'react'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'

const Train = props => {
  const train = props.data
  console.log(train)
  const arrives = train.timeTableRows.filter(
    station =>
      station.stationShortCode === props.settings.from &&
      station.type === `DEPARTURE`
  )[0]

  return (
    <div>
      {train.commuterLineID || `${train.trainType} ${train.operatorUICCode}`}
      {` `}
      saapuu
      {` `}
      {DateTime.fromISO(arrives.liveEstimateTime || arrives.scheduledTime).
        setLocale(`fi-FI`).
        toLocaleString(DateTime.TIME_WITH_SECONDS)}
    </div>
  )
}

Train.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object,
}

export default Train
