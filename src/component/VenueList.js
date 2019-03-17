import React, { Component } from 'react';
import ListItem from './ListItem'

class VenueList extends Component {

  render() {
    return (
      <div style={{ height: `100%` }}>
        <ul className="places-list">
          {this.props.filterVenues.filter && this.props.filterVenues.map((venue, idx) =>
            <ListItem
              key={idx}
              {...venue}
              handleListItemClick={this.props.handleListItemClick}
            />
          )}
        </ul>
      </div>
    )
  }
}

export default VenueList;