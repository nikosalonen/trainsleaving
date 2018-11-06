import React from 'react'

export const app = {
  trains: [],
  settings: {
    from: `HKI`,
    to: `TKL`,
    showCancelled: true,
    includeLongDistance: false,
    includeCommuter: true,
    includeRussia: false,
  },
}

export const AppContext = React.createContext(app)
