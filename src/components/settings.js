import React from 'react'
import { AppConsumer } from '../context/context'
import TrainAutocomplete from './trainAutocomplete'
import 'spectre.css'
import 'spectre.css/dist/spectre-icons.min.css'
import 'spectre.css/dist/spectre-exp.min.css'
const Settings = () => {
  return (
    <div>
      <AppConsumer>
        {({
          toggleSetting,
          trainSettings,
          stations,
          autocompleteOnChange

        }) => (
          <div className="container">
            {/* {JSON.stringify(suggestions)} */}
            <div className="columns">
              <div className="column col-12 col-ml-auto">
                {trainSettings.showSettings ? (
                  <i className="icon icon-arrow-up c-hand" />
                ) : (
                  <i className="icon icon-arrow-down c-hand" />
                )}
              </div>

              <div className="column col-6">
                <div className="form-group">
                  <label className="form-switch">
                    <input
                      type="checkbox"
                      name="includeCommuter"
                      checked={trainSettings.includeCommuter}
                      onChange={toggleSetting}
                    />
                    <i className="form-icon" /> Näytä lähijunat
                  </label>
                </div>
                <div className="form-group">
                  <label className="form-switch">
                    <input
                      type="checkbox"
                      name="includeLongDistance"
                      checked={trainSettings.includeLongDistance}
                      onChange={toggleSetting}
                    />
                    <i className="form-icon" /> Näytä kaukojunat
                  </label>
                </div>
              </div>
              <div className="column col-6">
                <div className="form-group">
                  <label className="form-label" htmlFor="from">
                    Mistä:
                    {stations &&
                      stations.length && (
                      <TrainAutocomplete id="from" placeholder="Lähtöpaikka" onChange={autocompleteOnChange} />
                    )}
                  </label>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="to">
                    Minne:
                    {` `}
                    {stations &&
                      stations.length && (
                      <TrainAutocomplete id="to" placeholder="Päämäärä" onChange={autocompleteOnChange} />

                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </AppConsumer>
    </div>
  )
}

export default Settings
