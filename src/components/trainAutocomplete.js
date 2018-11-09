import React from 'react'
import Autosuggest from 'react-autosuggest'
import { AppConsumer } from "../context/context"


class TrainAutosuggest extends React.Component {


  onChange = (_, { newValue }) => {
    const { id, onChange } = this.props


    onChange(id, newValue)
  };

  render() {


    return (

      <AppConsumer>
        {({ suggestions,
          onSuggestionsFetchRequested,
          onSuggestionsClearRequested,
          autocompleteOnChange,
          trainSettings,
          getSuggestionValue,
          renderSuggestion

        }) => (
          <Autosuggest
            id={this.props.id}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              id:this.props.id,
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
export default TrainAutosuggest
