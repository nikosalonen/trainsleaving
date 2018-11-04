import React from 'react'
import axios from 'axios'
import Train from './train'

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
        `https://rata.digitraffic.fi/api/v1/live-trains/station/${from}?arrived_trains=1&arriving_trains=15&departed_trains=0&departing_trains=5&include_nonstopping=false`
      ).
      then(res => {
        let trains = res.data

        this.setState({ trains })
      })
  }

  render() {
    return (
      <div>
        {this.state.trains.map((train, i) => {
          if (!this.state.settings.includeRussia && train.trainType === `AE`) {
            return false
          }
          if (
            !this.state.settings.includeLongDistance &&
            train.trainCategory === `Long-distance`
          ) {
            return false
          }

          if (
            !this.state.settings.includeCommuter &&
            train.trainCategory === `Commuter`
          ) {
            return false
          }
          return <Train key={i} data={train} settings={this.state.settings} />
        })}
      </div>
    )
  }
}

export default Trains
