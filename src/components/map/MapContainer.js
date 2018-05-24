import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React from 'react';

export class MapContainer extends React.Component {
  render() {
    return (
      <Map google={this.props.google}
        style={{width: this.props.width, height: this.props.height, position: 'relative'}}
        center={{
            lat: this.props.lat,
            lng: this.props.lng
          }}
        zoom={13}
        >
        <Marker
            title={'Wybrane miejsce.'}
            name={'Szczytno'}
            position={{lat: this.props.lat, lng: this.props.lng}} />
      </Map>
    )
  }
}
 
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCpfsvg2D48i5iYX9PoUy-NE2Yi_vM0H1M')
})(MapContainer)