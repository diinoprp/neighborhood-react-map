import React, { Component } from 'react';

class ListItem extends Component {



  render() {
    return (
      <li onClick={() => this.props.handleListItemClick(this.props)}>
        <div>
          <img src={this.props.categories[0].icon.prefix + "32" + this.props.categories[0].icon.suffix} alt={this.props.categories[0].name} />
          {this.props.name}
        </div>
        <div className="venueAddress">{this.props.location.address}</div>
      </li>
    )
  }
}

export default ListItem;