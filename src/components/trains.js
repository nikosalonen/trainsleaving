import React from 'react'
import axios from 'axios'
import Train from './train'
import { DateTime } from 'luxon'

class Trains extends React.Component {
  state = {
    trains: [],
    settings: {
      from: `TKL`,
      to: `HKI`,
      showCancelled: true,
      includeLongDistance: false,
      includeCommuter: true,
      includeRussia: false,
    },
  }
  componentDidMount() {
    this.getTrains()
    this.interval = setInterval(() => this.getTrains(), 1000 * 60)
  }
  componentWillUnmount() {
    this._mounted = false
  }

  getTrains() {
    const from = this.state.settings.from
    axios.
      get(
        `https://rata.digitraffic.fi/api/v1/live-trains/station/${from}?arrived_trains=0&arriving_trains=0&departed_trains=0&departing_trains=50&include_nonstopping=false`
      ).
      then(res => {
        let trains = res.data
        this.setState({ trains })
      })
  }

  render() {
    return (
      <div>
        <h1>
          🚂 Junat {this.state.settings.from} ➡️ {this.state.settings.to}
        </h1>
        {this.state.trains.
          sort((a, b) => {
            const fromA = a.timeTableRows.findIndex(
              row =>
                row.stationShortCode === this.state.settings.from &&
                row.type === `DEPARTURE`
            )

            const fromB = b.timeTableRows.findIndex(
              row =>
                row.stationShortCode === this.state.settings.from &&
                row.type === `DEPARTURE`
            )

            return (
              DateTime.fromISO(a.timeTableRows[fromA].scheduledTime) -
              DateTime.fromISO(b.timeTableRows[fromB].scheduledTime)
            )
          }).
          map(train => {
            if (
              (!this.state.settings.includeRussia &&
                train.trainType === `AE`) ||
              (!this.state.settings.includeLongDistance &&
                train.trainCategory === `Long-distance`) ||
              (!this.state.settings.includeCommuter &&
                train.trainCategory === `Commuter`)
            ) {
              return false
            }
            return (
              <Train
                key={train.trainNumber}
                data={train}
                settings={this.state.settings}
              />
            )
          })}
      </div>
    )
  }
}

export default Trains
