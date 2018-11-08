import React, { lazy, Suspense } from 'react'
import Time from './time'
const Trains = lazy(() => import(`./trains`))
import Settings from './settings'
import axios from 'axios'

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

      // axios.
      //   get(
      //     `https://rata.digitraffic.fi/api/v1/live-trains/station/${from}?arrived_trains=0&arriving_trains=0&departed_trains=0&departing_trains=50&include_nonstopping=false`
      //   ).
      //   then(res => {
      //     let trains = res.data
      //     this.setState({ trains })
      //   })
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

    const trains = <Trains />
    return (
      <div>
        <Time />
        <AppContext.Provider value={this.state}>
          <Settings />
          <Suspense fallback={<div>Ladataana tietoja...</div>}>
            {trains}
          </Suspense>
        </AppContext.Provider>
      </div>
    )
  }
}

export default App
