import React from 'react'
import { AppConsumer } from '../context/context'
import 'spectre.css'
const Settings = () => {
  return(
    <div>
      <AppConsumer>
        {({ toggleSetting, trainSettings }) => (
          <div>
            <div className="form-group">
              <label className="form-switch">
                <input type="checkbox" name="includeCommuter" checked={trainSettings.includeCommuter} onChange={toggleSetting} />
                <i className="form-icon"></i> Näytä lähijunat
              </label>
            </div>
            <div className="form-group">
              <label className="form-switch">
                <input type="checkbox" name="includeLongDistance" checked={trainSettings.includeLongDistance} onChange={toggleSetting} />
                <i className="form-icon"></i> Näytä kaukojunat
              </label>
            </div>
          </div>
        )}
      </AppConsumer>
    </div>)

}

export default Settings
