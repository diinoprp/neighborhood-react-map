/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import poweredByFourSquare from '../foursquareSVG.svg';
import { Image } from 'react-bootstrap';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    zoom={props.zoom}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={props.center}
    onClick={() => props.onMapClick()}
  >
    {props.markers &&
      props.markers.filter(marker => marker.isVisible).map((marker, index, arr) => {
        const venueInfo = props.venues.find(venue => venue.id === marker.id)
        return (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.handleMarkerClick(marker)}
            animation={props.activeMarker ? (marker.id === props.activeMarker.id ? google.maps.Animation.BOUNCE : '0'): '0'}
          >
            {marker.isOpen && (
              <InfoWindow onCloseClick={() => props.onInfoWindowClose()}>
                <React.Fragment>
                  <h3>{venueInfo.name}</h3>

                  {venueInfo.bestPhoto && (
                    <Image
                      src={`${venueInfo.bestPhoto.prefix}250x250${venueInfo.bestPhoto.suffix}`}
                      alt={venueInfo.name}
                    />)}

                  {venueInfo.rating &&
                    <h4>Nota:
                      <span style={{ color: `#${venueInfo.ratingColor}` }}>
                        {venueInfo.rating}
                      </span>
                    </h4>
                  }
                  <p>{venueInfo.description}</p>
                  <Image
                    src={poweredByFourSquare}
                    alt="Powered by FourSquare"
                    width="45%"
                    height="15%" />
                </React.Fragment>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
  </GoogleMap>
))

export default class Map extends Component {
  render() {
    return (
      < MyMapComponent
        {...this.props}
        googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAtvD2ig0fFoCUVNTnOdeEnXvLvJkUXbwY'
        loadingElement={< div style={{ height: `100%` }} />}
        containerElement={< div style={{ height: `calc(100vh - 36px)`, width: `100%` }} />}
        mapElement={< div style={{ height: `100%` }} />}
      />
    )
  }
}
