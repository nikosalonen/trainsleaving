import React from 'react'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'

const Train = props => {
  const train = props.data
  const settings = props.settings
  const from = train.timeTableRows.findIndex(
    row => row.stationShortCode === settings.from && row.type === `DEPARTURE`
  )

  const to = train.timeTableRows.findIndex(
    row => row.stationShortCode === settings.to && row.type === `ARRIVAL`
  )

  if (from > to) {
    return false
  }

  const departureFrom = train.timeTableRows.filter(
    station =>
      station.stationShortCode === props.settings.from &&
      station.type === `DEPARTURE`
  )

  console.log(departureFrom)

  return (
    <div>
      {train.commuterLineID || `${train.trainType} ${train.trainNumber}`}
      {` `}
      lähtee
      {` `}
      {departureFrom[0].liveEstimateTime
        ? DateTime.fromISO(departureFrom[0].liveEstimateTime).
          setLocale(`fi-FI`).
          toLocaleString(DateTime.TIME_24_SIMPLE)
        : `~  ${DateTime.fromISO(departureFrom[0].scheduledTime).
          setLocale(`fi-FI`).
          toLocaleString(DateTime.TIME_24_SIMPLE)}`}
      {` `}
      raiteelta {departureFrom[0].commercialTrack}
    </div>
  )
}

Train.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object,
}

export default Train
