import React from 'react'

export const app = {
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

export const AppContext = React.createContext(app)
