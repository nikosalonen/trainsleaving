import React from 'react'

export const app = {
  trains: [],
  trainSettings: {
    from: {
      stationShortCode: `HKI`,
      stationName: `Helsinki asema`,
      latitude: 60.172097,
      longitude: 24.941249,
    },
    to: {
      stationShortCode: `LH`,
      stationName: `Lahti`,
      latitude: 60.97647,
      longitude: 25.657397,
    },
    showCancelled: true,
    includeLongDistance: false,
    includeCommuter: true,
    includeRussia: false,
  },
  getTrains: () => {},
  swapStations: () => {},
  toggleSetting: () => {},
  hideSettins: () => {},
  getSuggestionValue: () => {},
  renderSuggestion: () => {},
  onSuggestionsFetchRequested: () => {},
  onSuggestionsClearRequested: () => {},
}

export const AppContext = React.createContext(app)
export const AppProvider = AppContext.Provider
export const AppConsumer = AppContext.Consumer
