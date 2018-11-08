import React from 'react'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import 'spectre.css'

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
  // console.log(from, to)

  const departureFrom = train.timeTableRows.filter(
    station =>
      station.stationShortCode === props.settings.from &&
      station.type === `DEPARTURE`
  )[0]

  // console.log(departureFrom)

  return (
    <tr>
      <td>
        {train.commuterLineID || `${train.trainType} ${train.trainNumber}`}
      </td>
      <td>
        {departureFrom.differenceInMinutes && departureFrom.differenceInMinutes > 1 && departureFrom.liveEstimateTime !== null
          ? `~ ${DateTime.fromISO(departureFrom.liveEstimateTime).
            setLocale(`fi-FI`).
            toLocaleString(DateTime.TIME_24_SIMPLE)}`
          :
          ` ${DateTime.fromISO(departureFrom.scheduledTime).
            setLocale(`fi-FI`).
            toLocaleString(DateTime.TIME_24_SIMPLE)}`
        }
      </td>
      <td>
        {departureFrom.commercialTrack}
      </td>

    </tr>
  )
}

Train.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object,
}

export default Train
