import React from 'react'
import Train from './train'

import { DateTime } from 'luxon'
import { AppConsumer } from '../context/context'
import 'spectre.css'
import './hsl.css'

const Trains = () => {


  return (
    <div>
      <AppConsumer>
        {(app) => (

          <div>

            <h2>
              {app.trainSettings.from} <span className="hslnormal">D</span>{` `}
              {app.trainSettings.to}
            </h2>
            <div id="trains">
              <button className="btn" onClick={app.swapStations}>
              Vaihda suunta
              </button>
              <div>
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
                              row.stationShortCode === app.trainSettings.to &&
                              row.type === `ARRIVAL` &&
                              row.commercialStop === true
                          ) !== -1
                      ).
                      sort((a, b) => {
                        const fromA = a.timeTableRows.findIndex(
                          row =>
                            row.stationShortCode === app.trainSettings.from &&
                            row.type === `DEPARTURE` &&
                            row.commercialStop === true
                        )

                        const fromB = b.timeTableRows.findIndex(
                          row =>
                            row.stationShortCode === app.trainSettings.from &&
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

                        return (
                          DateTime.fromISO(first) - DateTime.fromISO(second)
                        )
                      }).
                      map(train => {
                        if (
                          (!app.trainSettings.includeRussia &&
                            train.trainType === `AE`)
                        ) {
                          return false
                        }
                        return (
                          <Train
                            key={train.trainNumber}
                            data={train}
                            settings={app.trainSettings}
                          />
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </AppConsumer>
    </div>
  )
}

export default Trains
