import React, { Component } from 'react';

class ListItem extends Component {



  render() {
    return (
      <li>
        <div>{this.props.name}</div>
        <div className="venueAddress">{this.props.location.address}</div>
      </li>
    )
  }
}

export default ListItem;