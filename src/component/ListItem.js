import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {
  render() {
    return (
      <li
        onClick={() => this.props.handleListItemClick(this.props)}
        aria-label={this.props.name}
        tabIndex='0'
      >
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

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  handleListItemClick: PropTypes.func.isRequired,
  location: PropTypes.shape({
    address: PropTypes.string.isRequired
  }),
  categories: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.shape({
      prefix: PropTypes.string.isRequired,
      suffix: PropTypes.string.isRequired,
    })
  }))
}
