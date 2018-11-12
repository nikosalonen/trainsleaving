import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import { AppConsumer } from '../context/context'

class TrainAutocomplete extends React.Component {
  onChange = (_, { newValue }) => {
    const { id, onChange } = this.props

    onChange(id, newValue)
  }

  render() {
    return (
      <AppConsumer>
        {({
          suggestions,
          onSuggestionsFetchRequested,
          onSuggestionsClearRequested,
          trainSettings,
          getSuggestionValue,
          renderSuggestion,
        }) => (
          <Autosuggest
            id={this.props.id}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              id: this.props.id,
              placeholder: this.props.placeholder,
              value: trainSettings[this.props.id].stationName,
              onChange: this.onChange,
              name: this.props.id,
            }}
          />
        )}
      </AppConsumer>
    )
  }
}

TrainAutocomplete.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.any,
}
export default TrainAutocomplete
