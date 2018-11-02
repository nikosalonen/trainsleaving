import React from 'react'

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { from: ``, to: ``, commuters: true, longDistance: false }
  }

  render() {
    return <div>Settings</div>
  }
}

export default Settings
