import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Navbar } from 'react-bootstrap';
import { HamburgerButton } from 'react-hamburger-button';
import VenueList from './VenueList';

class AppMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      query: '',
      venues: []
    }
  }

  handleMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name
          .toLowerCase()
          .includes(this.state.query.toLowerCase()))
      return venues;
    }
    return this.props.venues;
  };

  handleChange = e => {
    this.setState({ query: e.target.value });

    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }

      return marker;
    });

    this.props.updateSuperState({ markers })
  };

  render() {
    return (
      <div>
        <Menu className="venueList" isOpen={this.state.menuOpen} noOverlay>
          <input
            type={"search"}
            className={"searchInput"}
            placeholder={"Filter Venues"}
            onChange={this.handleChange}
            aria-label="Filter Venues"
          />
          <VenueList {...this.props} filterVenues={this.handleFilterVenues()} handleListItemClick={this.props.handleListItemClick} />
        </Menu>
        <Navbar bg="dark" style={{ zIndex: 1 }}>
          <HamburgerButton
            open={this.state.menuOpen}
            className="hamburgerButton"
            width={23}
            height={20}
            animationDuration={0.5}
            strokeWidth={2}
            color='white'
            onClick={() => this.handleMenuClick()}
          />
        </Navbar>

      </div>
    );
  }
}

export default AppMenu;
