import React from 'react'
import Time from './time'
import Trains from './trains'
import Settings from './settings'
import axios from 'axios'
import 'spectre.css'

import { AppContext, app } from '../context/context'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...app,
      getTrains: this.getTrains,
      swapStations: this.swapStations
    }

    this.swapStations = () => {
      console.log(this.state.settings.from, this.state.settings.to)
      const settings = { ...this.state.settings, to: this.state.settings.from, from: this.state.settings.to }
      this.setState({ settings })
    }

    this.getTrains = () => {
      const from = this.state.settings.from
      // // https://rata.digitraffic.fi/api/v1/graphql/graphiql?

      let query = `{
        viewer {
          getStationsTrainsUsingGET( where:"[*trainCategory=Commuter]", station: "${from}",include_nonstopping:false, arrived_trains:0, arriving_trains:0, departed_trains:0, departing_trains:50) {
            trainCategory
            trainType
            cancelled
            commuterLineID
            trainNumber
            timeTableRows {
              trainStopping
              stationShortCode
              type
              commercialStop
              commercialTrack
              cancelled
              scheduledTime
              liveEstimateTime
              actualTime
              differenceInMinutes
            }
          }
        }
      }`

      axios({
        url: `https://rata.digitraffic.fi/api/v1/graphql/graphiql?`,
        method: `post`,
        headers: {
          'Content-Type': `application/json`,
        },
        data: {
          query: query,
        },
      }).then(result => {
        let trains = result.data.data.viewer.getStationsTrainsUsingGET
        // console.log(trains)
        this.setState({ trains })
      })

    }
  }

  componentDidMount() {
    this.getTrains()
    this.interval = setInterval(() => this.getTrains(), 1000 * 60)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // https://rata.digitraffic.fi/api/v1/metadata/stations
  render() {

    return (
      <div className="container">
        <div className="columns">
          <div className="column col-3 col-ml-auto" style={{ textAlign: `right` }}>
            <Time />
          </div>
          <div className="column col-12">
            <AppContext.Provider value={this.state}>
              <Settings />
              {this.state.trains.length ?
                <Trains /> :
                <div className="empty">
                  <div className="empty-icon">
                    <i className="icon icon-people"></i>
                  </div>
                  <p className="empty-title h5">Haetaan junatietoja 🚂</p>
                  <p className="empty-subtitle">Tähän menee hetki internetyhteytesi nopeudesta riippuen.</p>

                </div>
              }
            </AppContext.Provider>
          </div>
        </div>

      </div>
    )
  }
}

export default App
