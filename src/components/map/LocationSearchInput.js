import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);  
    this.state = { address: '', submitted: false }
  }

  handleChange = (address) => {
    this.setState({ address })
  }

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.setLngAndLat(latLng.lng, latLng.lat))
      .catch(error => console.error('Error', error))
    this.setState({submitted: true})
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <div class="input-group">
                <input
                {...getInputProps({
                    placeholder: 'Miejsce wydarzenia ...',
                    className: 'form-control margin-top location-search-input'
                })}
                />
                {this.state.submitted ? (<span class="input-group-btn">
                    <button class="btn btn-secondary margin-top" type="button" onClick={this.props.openModal}>Zobacz na mapie</button>
                </span>) : (<div></div>)}
                
            </div>
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style })}>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}