import React from 'react'
import Time from './time'
import Trains from './trains'
import Settings from './settings'
import axios from 'axios'
import 'spectre.css'

import { AppProvider } from '../context/context'

class App extends React.Component {
  constructor(props) {
    super(props)


    this.swapStations = () => {

      this.setState({ trainSettings: { ...this.state.trainSettings, to:this.state.trainSettings.from, from: this.state.trainSettings.to } })

    }

    this.toggleSetting = (e) => {

      const target = e.target
      const value = target.type === `checkbox` ? target.checked : target.value
      const name = target.name

      let update = { [name]: value }

      const other = name === `includeCommuter` ? `includeLongDistance` : `includeCommuter`
      if (value === false && this.state.trainSettings[other] === false) {
        update = { ...update, [other]:true }
      }
      this.setState({ trainSettings: { ...this.state.trainSettings, ...update } })

    }

    this.reInit = (erase = false) => {
      clearInterval(this.interval)

      erase && this.setState({ trains: [] })
      this.getTrains()
      this.interval = setInterval(() => this.getTrains(), 1000 * 60)

    }
    this.getTrains = () => {
      const from = this.state.trainSettings.from
      // // https://rata.digitraffic.fi/api/v1/graphql/graphiql?
      let where = ``
      if (this.state.trainSettings.includeCommuter && !this.state.trainSettings.includeLongDistance) {
        where = `where:"[*trainCategory=Commuter]"`
      }
      else if (!this.state.trainSettings.includeCommuter && this.state.trainSettings.includeLongDistance) {
        where = `where:"[*trainCategory=Long-distance]"`

      }

      let query = `{
        viewer {
          getStationsTrainsUsingGET( ${where}, station: "${from}",include_nonstopping:false, arrived_trains:0, arriving_trains:0, departed_trains:0, departing_trains:50) {
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
        this.setState({ trains })
      })

    }

    this.state = {
      trains: [],
      trainSettings: {
        from: `HKI`,
        to: `TKL`,
        showCancelled: true,
        includeLongDistance: false,
        includeCommuter: true,
        includeRussia: false,
      },
      getTrains: this.getTrains,
      swapStations: this.swapStations,
      toggleSetting: this.toggleSetting
    }


  }
  componentDidMount() {

    this.getTrains()
    this.interval = setInterval(() => this.getTrains(), 1000 * 60)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.trainSettings.from !== this.state.trainSettings.from ||
      prevState.trainSettings.includeCommuter !== this.state.trainSettings.includeCommuter ||
      prevState.trainSettings.includeLongDistance !== this.state.trainSettings.includeLongDistance ) {


      clearInterval(this.interval)

      this.getTrains()
      this.interval = setInterval(() => this.getTrains(), 1000 * 60)
    }

  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // https://rata.digitraffic.fi/api/v1/metadata/stations
  render() {

    return (
      <div className="app container">
        <div className="columns">
          <div className="column col-6 col-ml-auto text-right" >
            <Time />
          </div>
          <div className="column col-12">
            <AppProvider value={this.state}>
              <Settings />
              {this.state.trains.length ?
                <Trains /> :
                <div className="empty">
                  <div className="empty-icon">
                    <i className="icon icon-people"></i>
                  </div>
                  <p className="empty-title h5">Haetaan junatietoja 🚂</p>
                  <p className="empty-subtitle">Tähän menee hetki internetyhteytesi nopeudesta riippuen.</p>
                  <div className="loading loading-lg"></div>
                </div>
              }
            </AppProvider>
          </div>
        </div>

      </div>
    )
  }
}

export default App
