import React, { Component } from 'react';
import Map from './component/Map';
import './App.scss';
import SquareAPI from './API/';
import AppMenu from './component/AppMenu';
import ErrorBoundary from 'react-error-boundary';


const FallbackComponent = ({ componentStack, error }) => (
  <div>
    <p><strong>Oops! An error occured!</strong></p>
  </div>
);

class App extends Component {
  constructor() {
    super();

    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      activeMarker: {},
      updateSuperState: obj => {
        this.setState(obj);
      }
    }
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      this.setState({activeMarker: null})
      return marker;
    })
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  }

  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({activeMarker: marker});
    this.setState({ markers: Object.assign(this.state.markers, marker) });

    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
    });
  }

  onMapClicked = () => {
    if(this.state.activeMarker) {
      this.setState({activeMarker: null});
      this.closeAllMarkers();
    }
  }

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  }

  onInfoWindowClosed = () => {
    this.setState({activeMarker: null});
  }

  componentDidMount() {
    SquareAPI.search({
      near: "Rio de Janeiro",
      query: "Museum",
      limit: 10
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, center, markers })
    })
  }

  render() {
    return (
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <div className="App">
          <AppMenu {...this.state} handleListItemClick={this.handleListItemClick}/>
          <Map {...this.state}
            handleMarkerClick={this.handleMarkerClick} 
            onMapClick={this.onMapClicked}
            onInfoWindowClose={this.onInfoWindowClosed}
          />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
