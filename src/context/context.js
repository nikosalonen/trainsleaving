import React from 'react'

export const app = {
  trains: [],
  trainSettings: {
    from: `HKI`,
    to: `TKL`,
    showCancelled: true,
    includeLongDistance: false,
    includeCommuter: true,
    includeRussia: false,
  },
  getTrains: () => {},
  swapStations: () => {  },
  toggleSetting: () => {  }
}

export const AppContext = React.createContext(app)
export const AppProvider = AppContext.Provider
export const AppConsumer = AppContext.Consumer
