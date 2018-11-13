import React from 'react'
import { AppConsumer } from '../context/context'
import TrainAutocomplete from './trainAutocomplete'
import 'spectre.css'
import 'spectre.css/dist/spectre-icons.min.css'
import 'spectre.css/dist/spectre-exp.min.css'
const Settings = () => {
  return (
    <div id="settings">
      <AppConsumer>
        {({
          toggleSetting,
          trainSettings,
          stations,
          autocompleteOnChange,
          hideSettins,
        }) => (
          <div className="container">
            {/* {JSON.stringify(suggestions)} */}
            <div className="columns">
              <div className="column col-12 col-ml-auto text-right">
                Asetukset
                {` `}
                <button
                  className="btn c-hand "
                  onClick={hideSettins}
                  aria-label="Näytä asetukset"
                >
                  <span className=" ">
                    {trainSettings.showSettings ? (
                      <i className="icon icon-arrow-up " />
                    ) : (
                      <i className="icon icon-arrow-down" />
                    )}
                  </span>
                </button>
              </div>
              {trainSettings.showSettings && (
                <div className="column col-12">
                  <div className="divider" />

                  <div className="columns">
                    <div className="column col-6 col-sm-12">
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
                      <div className="form-group">
                        <label className="form-switch">
                          <input
                            type="checkbox"
                            name="showCancelled"
                            checked={trainSettings.showCancelled}
                            onChange={toggleSetting}
                          />
                          <i className="form-icon" /> Näytä peruutetut
                        </label>
                      </div>
                    </div>
                    <div className="column col-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="from">
                          Mistä:
                          {stations &&
                            stations.length && (
                            <TrainAutocomplete
                              id="from"
                              placeholder="Lähtöpaikka"
                              onChange={autocompleteOnChange}
                            />
                          )}
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="to">
                          Minne:
                          {` `}
                          {stations &&
                            stations.length && (
                            <TrainAutocomplete
                              id="to"
                              placeholder="Päämäärä"
                              onChange={autocompleteOnChange}
                            />
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
                </div>
              )}
            </div>
          </div>
        )}
      </AppConsumer>
    </div>
  )
}

export default Settings
