import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import ListItem from './ListItem'

class VenueList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      showingLocations: []
    }
  }

  updateQuery(query, locations) {
    this.setState({ query });
  }

  filterLocations() {
    // Filter the locations list using the user input
    const { locations } = this.props;
    const { query } = this.state;
    
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      return locations.filter((venue) => match.test(venue.name) || match.test(venue.location.address));
    } else {
      return locations
    }
  }

  render() {
    return (
      <div style={{height: `100%`}}>
        <input
          type={"search"}
          className={"searchInput"}
          placeholder={"Filter Venues"}
          value={this.state.query}
          onChange={(e) => this.updateQuery(e.target.value)}
          aria-label="Filter Venues"
        />
        <ul className="places-list">
          {this.props.venues && this.props.venues.map((venue, idx) => <ListItem key={idx} {...venue} />)}
        </ul>
      </div>
    )
  }
}

export default VenueList;