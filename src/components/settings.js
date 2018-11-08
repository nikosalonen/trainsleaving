import React from 'react'
// import { AppContext } from '../context/context'

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { from: ``, to: ``, commuters: true, longDistance: false }
  }

  render() {
    let props = this.props
    let app = this.context

    return <div />
  }
}

export default Settings
