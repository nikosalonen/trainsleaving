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

  if (from > to || from === -1 || to === -1 || (train.timeTableRows[from] && train.timeTableRows[from].actualTime)) {
    return false
  }
  console.log(train)
  // console.log(from, to)

  const departureFrom = train.timeTableRows.filter(
    station =>
      station.stationShortCode === props.settings.from &&
      station.type === `DEPARTURE`
  )[0]

  // console.log(departureFrom)

  return (
    <div>
      {train.commuterLineID || `${train.trainType} ${train.trainNumber}`}
      {` `}
      lähtee
      {` `}
      {departureFrom.differenceInMinutes && departureFrom.differenceInMinutes > 1 && departureFrom.liveEstimateTime !== null
        ? `~ ${DateTime.fromISO(departureFrom.liveEstimateTime).
          setLocale(`fi-FI`).
          toLocaleString(DateTime.TIME_24_SIMPLE)}`
        :
        ` ${DateTime.fromISO(departureFrom.scheduledTime).
          setLocale(`fi-FI`).
          toLocaleString(DateTime.TIME_24_SIMPLE)}`
      }
      {` `}
      raiteelta {departureFrom.commercialTrack}
    </div>
  )
}

Train.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object,
}

export default Train
