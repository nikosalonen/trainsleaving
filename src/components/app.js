import React from 'react'
import Time from './time'
import Trains from './trains'
import Footer from './footer'
import Settings from './settings'
import axios from 'axios'
import localStorage from 'localStorage'
import 'spectre.css'
import './layout.css'
import ReactFitText from 'react-fittext'
import Ads from './ads'
import { AppProvider } from '../context/context'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.getSuggestions = value => {
      const inputValue = value.trim().toLowerCase()
      const inputLength = inputValue.length

      return inputLength === 0
        ? []
        : this.state.stations.filter(
          station =>
            station.stationName.toLowerCase().slice(0, inputLength) ===
            inputValue
        )
    }

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    this.getSuggestionValue = suggestion => {
      // console.log(suggestion)
      return suggestion.stationName
    }

    // Use your imagination to render suggestions.
    this.renderSuggestion = suggestion => <span>{suggestion.stationName}</span>

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    this.onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: this.getSuggestions(value),
      })
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    this.onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: [],
      })
    }
    this.onSuggestionSelected = (event, { suggestion }) => {
      let station = {}
      if (suggestion !== this.state.trainSettings[event.target.name]) {
        station = this.state.stations.filter(
          station => suggestion === station.stationName
        )
      }
      this.setState(
        {
          trainSettings: {
            ...this.state.trainSettings,

            [event.target.name]: station.length
              ? station[0]
              : {
                ...this.state.trainSettings[event.target.name],
                stationName: suggestion,
              },
          },
        },
        () => {
          localStorage.setItem(
            `trainSettings`,
            JSON.stringify(this.state.trainSettings)
          )
        }
      )
    }
    this.autocompleteOnChange = (id, newValue) => {
      let station = -1
      if (
        newValue &&
        // newValue.length > 3 &&
        newValue !== this.state.trainSettings[id].stationName
      ) {
        station = this.state.stations.findIndex(
          station => newValue === station.stationName
        )
      }

      this.setState(
        {
          trainSettings: {
            ...this.state.trainSettings,

            [id]:
              station !== -1
                ? this.state.stations[station]
                : {
                  ...this.state.trainSettings[id],
                  stationName: newValue,
                },
          },
        },
        () => {
          localStorage.setItem(
            `trainSettings`,
            JSON.stringify(this.state.trainSettings)
          )
        }
      )
    }

    this.swapStations = () => {
      this.setState(
        {
          trainSettings: {
            ...this.state.trainSettings,
            to: this.state.trainSettings.from,
            from: this.state.trainSettings.to,
          },
        },
        () => {
          localStorage.setItem(
            `trainSettings`,
            JSON.stringify(this.state.trainSettings)
          )
        }
      )
    }

    this.hideSettings = () => {
      this.setState({
        trainSettings: {
          ...this.state.trainSettings,
          showSettings: !this.state.trainSettings.showSettings,
        },
      }, () => {
        localStorage.setItem(
          `trainSettings`,
          JSON.stringify(this.state.trainSettings)
        )
      })
    }

    this.toggleSetting = e => {
      const target = e.target
      const value = target.type === `checkbox` ? target.checked : target.value
      const name = target.name

      let update = { [name]: value }

      const other =
        name === `includeCommuter` ? `includeLongDistance` : `includeCommuter`
      if (value === false && this.state.trainSettings[other] === false) {
        update = { ...update, [other]: true }
      }
      this.setState(
        {
          trainSettings: { ...this.state.trainSettings, ...update },
        },
        () => {
          localStorage.setItem(
            `trainSettings`,
            JSON.stringify(this.state.trainSettings)
          )
        }
      )
    }

    this.reInit = (erase = false) => {
      clearInterval(this.interval)

      erase && this.setState({ trains: [] })
      this.getTrains()
      this.interval = setInterval(() => this.getTrains(), 1000 * 60)
    }

    this.getStations = () => {
      let query = `{
        viewer {
          getStationsUsingGET(where:"[*passengerTraffic:true"){
            stationShortCode
            stationName
            latitude
            longitude
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
        let stations = result.data.data.viewer.getStationsUsingGET.map(
          station => {
            return {
              ...station,
              stationName: station.stationName.replace(/ [Aa]sema/, ``),
            }
          }
        )
        this.setState({ stations }, () => {
          localStorage.setItem(`stations`, JSON.stringify(stations))
        })
      })
    }
    this.getTrains = () => {
      const from = this.state.trainSettings.from.stationShortCode
      let where = ``
      if (
        this.state.trainSettings.includeCommuter &&
        !this.state.trainSettings.includeLongDistance
      ) {
        where = `where:"[*trainCategory=Commuter]"`
      }
      else if (
        !this.state.trainSettings.includeCommuter &&
        this.state.trainSettings.includeLongDistance
      ) {
        where = `where:"[*trainCategory=Long-distance]"`
      }

      let query = `{
        viewer {
          getStationsTrainsUsingGET( ${where}, station: "${from}", arrived_trains:0, arriving_trains:0, departed_trains:0, departing_trains:100) {
            operatorUICCode
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
        let trains = result.data.data.viewer.getStationsTrainsUsingGET.
          map(train => {
            return {
              ...train,
              timeTableRows: train.timeTableRows.filter(
                row =>
                  row.stationShortCode ===
                  this.state.trainSettings.to.stationShortCode ||
                  row.stationShortCode ===
                  this.state.trainSettings.from.stationShortCode
              ),
            }
          }).
          filter(train => {
            const stations = train.timeTableRows
            const willArrive =
              stations.findIndex(
                row =>
                  // Saapuu määränpäähän
                  row.stationShortCode ===
                  this.state.trainSettings.to.stationShortCode &&
                  row.type === `ARRIVAL` &&
                  row.commercialStop === true
              ) !== -1
            const willDeparture =
              stations.findIndex(
                row =>
                  // Lähtee määränpäästä
                  row.stationShortCode ===
                  this.state.trainSettings.from.stationShortCode &&
                  row.type === `DEPARTURE` &&
                  row.commercialStop === true
              ) !== -1

            return willArrive && willDeparture
          })
        this.setState({ trains })
        this.setState({ ...this.state, previousSearch: trains.length })
      })
    }

    this.state = {
      trains: [],
      stations: localStorage.getItem(`stations`)
        ? JSON.parse(localStorage.getItem(`stations`))
        : [],
      suggestions: [],
      trainSettings: localStorage.getItem(`trainSettings`)
        ? JSON.parse(localStorage.getItem(`trainSettings`))
        : {
          showSettings: false,
          from: {
            stationShortCode: `HKI`,
            stationName: `Helsinki`,
            latitude: 60.172097,
            longitude: 24.941249,
          },
          to: {
            stationShortCode: `TKL`,
            stationName: `Tikkurila`,
            latitude: 60.292166,
            longitude: 25.044055,
          },
          showCancelled: false,
          includeLongDistance: false,
          includeCommuter: true,
          includeRussia: false,
        },
      getTrains: this.getTrains,
      getStations: this.getStations,
      swapStations: this.swapStations,
      toggleSetting: this.toggleSetting,
      hideSettings: this.hideSettings,
      getSuggestions: this.getSuggestions,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.onSuggestionsClearRequested,
      autocompleteOnChange: this.autocompleteOnChange,
      autocompleteOnBlur: this.autocompleteOnBlur,
    }
  }
  componentDidMount() {
    this.getTrains()
    if (!this.state.stations.length) {
      this.getStations()
    }
    this.interval = setInterval(() => this.getTrains(), 1000 * 60)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.trainSettings.from.stationShortCode !==
      this.state.trainSettings.from.stationShortCode ||
      prevState.trainSettings.to.stationShortCode !==
      this.state.trainSettings.to.stationShortCode ||
      prevState.trainSettings.includeCommuter !==
      this.state.trainSettings.includeCommuter ||
      prevState.trainSettings.includeLongDistance !==
      this.state.trainSettings.includeLongDistance
    ) {
      clearInterval(this.interval)
      this.getTrains()
      this.interval = setInterval(() => this.getTrains(), 1000 * 60)
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className="app container">
        <div className="columns">
          <div className="column col-12">
            <Ads client={`ca-pub-0748442567853482`} slot={`4470981255`} />
          </div>
          <div className="column col-12 col-ml-auto text-right">
            <Time />
          </div>
          <div className="column col-12">
            <AppProvider value={this.state}>
              <section className="settings">
                <Settings />
              </section>
              <ReactFitText maxFontSize={32}>
                <h2>
                  {this.state.trainSettings.from.stationName}
                  {` `}
                  <span className="hslnormal">D</span>
                  {` `}
                  {this.state.trainSettings.to.stationName}
                </h2>
              </ReactFitText>
              <button className="btn" onClick={this.state.swapStations}>
                Vaihda suunta
              </button>
              <section>
                <Trains />
                {/* {this.state.trains.length ? (
                ) : (
                  <div className="empty">
                    <div className="empty-icon">🚂</div>
                    {this.state.previousSearch !== 0 ? (
                      <div>
                        <p className="empty-title h5">Haetaan junatietoja</p>
                        <p className="empty-subtitle">
                            Tähän menee hetki internetyhteytesi nopeudesta riippuen.
                        </p>
                        <div className="loading loading-lg" />
                      </div>
                    ) : (
                      <div>
                        <p className="empty-title h5">Pahoittelut!</p>
                        <p className="empty-subtitle">
                              Valitulla haulla ei löytynyt suoria junareittejä.
                        </p>
                      </div>
                    )}
                  </div>
                )} */}
              </section>
            </AppProvider>
          </div>
          <footer className="column col-12 text-center">
            <div className="divider" />
            <Footer />
          </footer>
        </div>
      </div>
    )
  }
}

export default App
