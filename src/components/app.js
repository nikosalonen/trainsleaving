import React from 'react'
import Time from './time'
import Trains from './trains'
import Settings from './settings'
import axios from 'axios'

import { AppContext, app } from '../context/context'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...app,
      getTrains: this.getTrains,
    }

    this.getTrains = () => {
      const from = app.settings.from
      // // https://rata.digitraffic.fi/api/v1/graphql/graphiql?
      // let query = `{
      //   viewer {
      //     getLiveTrainsByVersionUsingGET{
      //       cancelled
      //       commuterLineID
      //       operatorShortCode
      //       timeTableRows {
      //         actualTime
      //         cancelled
      //         commercialStop
      //         commercialTrack
      //         countryCode
      //         differenceInMinutes
      //         estimateSource
      //         liveEstimateTime
      //         scheduledTime
      //         stationShortCode
      //         stationUICCode
      //         trainStopping
      //         type
      //         unknownDelay
      //       }
      //     }
      //   }
      // }`

      // axios({
      //   url: `https://rata.digitraffic.fi/api/v1/graphql/?`,
      //   header: {
      //     'Access-Control-Allow-Origin':`*`
      //   },
      //   method: `post`,
      //   data: {
      //     query: query
      //   }
      // }).then((result) => {
      //   console.log(result.data)
      // })

      axios.
        get(
          `https://rata.digitraffic.fi/api/v1/live-trains/station/${from}?arrived_trains=0&arriving_trains=0&departed_trains=0&departing_trains=50&include_nonstopping=false`
        ).
        then(res => {
          let trains = res.data
          this.setState({ trains })
        })
    }
  }

  componentDidMount() {
    this.getTrains()
    this.interval = setInterval(() => this.getTrains(), 1000 * 60)
  }
  componentWillUnmount() {
    this._mounted = false
  }

  // https://rata.digitraffic.fi/api/v1/metadata/stations
  render() {
    return (
      <div>
        <Time />
        <AppContext.Provider value={this.state}>
          <Settings />
          <Trains />
        </AppContext.Provider>
      </div>
    )
  }
}

export default App
