import React from 'react'
import Train from './train'

import { DateTime } from 'luxon'
import { AppContext } from '../context/context'
import 'spectre.css'

class Trains extends React.Component {
  render() {
    // let props = this.props
    let app = this.context

    return (
      <div>
        <h2>
          {app.settings.from} ➡️ {app.settings.to}
        </h2>
        <div id="trains">
          <AppContext.Consumer>
            {({ swapStations }) => (

              <button className="btn" onClick={swapStations}>Vaihda suunta</button>

            )}
          </AppContext.Consumer>
          <div>{app.settings.from} - {app.settings.to}</div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Juna</th>
                <th>Aika</th>
                <th>Raide</th>
              </tr>
            </thead>
            <tbody>


              {app.trains &&
            app.trains.
              filter(
                train =>
                  train.timeTableRows.findIndex(
                    row =>
                      // Saapuu määränpäähän
                      row.stationShortCode === app.settings.to &&
                      row.type === `ARRIVAL` &&
                      row.commercialStop === true
                  ) !== -1
              ).
              sort((a, b) => {
                const fromA = a.timeTableRows.findIndex(
                  row =>
                    row.stationShortCode === app.settings.from &&
                    row.type === `DEPARTURE` &&
                    row.commercialStop === true
                )

                const fromB = b.timeTableRows.findIndex(
                  row =>
                    row.stationShortCode === app.settings.from &&
                    row.type === `DEPARTURE` &&
                    row.commercialStop === true
                )

                if ([ fromA, fromB ].some(num => num === -1)) {
                  return false
                }
                const first = a.timeTableRows[fromA].liveEstimateTime
                  ? a.timeTableRows[fromA].liveEstimateTime
                  : a.timeTableRows[fromA].scheduledTime

                const second = b.timeTableRows[fromB].liveEstimateTime
                  ? b.timeTableRows[fromB].liveEstimateTime
                  : b.timeTableRows[fromB].scheduledTime

                return DateTime.fromISO(first) - DateTime.fromISO(second)
              }).
              map(train => {
                if (
                  (!app.settings.includeRussia && train.trainType === `AE`) ||
                  (!app.settings.includeLongDistance &&
                    train.trainCategory === `Long-distance`) ||
                  (!app.settings.includeCommuter &&
                    train.trainCategory === `Commuter`)
                ) {
                  return false
                }
                return (
                  <Train
                    key={train.trainNumber}
                    data={train}
                    settings={app.settings}
                  />
                )
              })}
            </tbody>
          </table>

        </div>
      </div>
    )
  }
}
Trains.contextType = AppContext
export default Trains
