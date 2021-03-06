import React from 'react'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import 'spectre.css'

const Train = props => {
  const train = props.data
  const settings = props.settings
  const from = train.timeTableRows.findIndex(
    row =>
      row.stationShortCode === settings.from.stationShortCode &&
      row.type === `DEPARTURE`
  )

  const to = train.timeTableRows.findIndex(
    row =>
      row.stationShortCode === settings.to.stationShortCode &&
      row.type === `ARRIVAL`
  )

  if (
    from > to ||
    from === -1 ||
    to === -1 ||
    (train.timeTableRows[from] && train.timeTableRows[from].actualTime)
  ) {
    return false
  }

  const departureFrom = train.timeTableRows.filter(
    station =>
      station.stationShortCode === props.settings.from.stationShortCode &&
      station.type === `DEPARTURE`
  )[0]
  if (departureFrom.cancelled && !settings.showCancelled) {
    return false
  }


  const arriveTo = train.timeTableRows.filter(
    station =>
      station.stationShortCode === props.settings.to.stationShortCode &&
      station.type === `ARRIVAL`
  )[0]


  const cancelled = departureFrom.cancelled && settings.showCancelled

  return (
    <tr className={cancelled ? `cancelled` : ``}>
      <td>
        {train.commuterLineID || `${train.trainType} ${train.trainNumber}`}
      </td>
      <td>
        {departureFrom.differenceInMinutes &&
          departureFrom.differenceInMinutes > 1 &&
          departureFrom.liveEstimateTime !== null
          ? `~ ${DateTime.fromISO(departureFrom.liveEstimateTime).
            setLocale(`fi-FI`).
            toLocaleString(DateTime.TIME_24_SIMPLE)}`
          : ` ${DateTime.fromISO(departureFrom.scheduledTime).
            setLocale(`fi-FI`).
            toLocaleString(DateTime.TIME_24_SIMPLE)}`}
      </td>
      <td>{cancelled ? `Peruttu` : departureFrom.commercialTrack}</td>
      <td>{arriveTo.differenceInMinutes &&
        arriveTo.differenceInMinutes > 1 &&
        arriveTo.liveEstimateTime !== null
        ? `~ ${DateTime.fromISO(arriveTo.liveEstimateTime).
          setLocale(`fi-FI`).
          toLocaleString(DateTime.TIME_24_SIMPLE)}`
        : ` ${DateTime.fromISO(arriveTo.scheduledTime).
          setLocale(`fi-FI`).
          toLocaleString(DateTime.TIME_24_SIMPLE)}`}</td>
    </tr>
  )
}

Train.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object,
}

export default Train
