import React from 'react'
import { DateTime } from 'luxon'

class Time extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: `${DateTime.local().
        setLocale(`fi-FI`).
        toLocaleString(DateTime.TIME_WITH_SECONDS)}`,
    }
  }

  tick() {
    this.setState(() => ({
      time: `${DateTime.local().
        setLocale(`fi`).
        toLocaleString(DateTime.TIME_WITH_SECONDS)}`,
    }))
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <div>Kello on {this.state.time}</div>
  }
}
export default Time
