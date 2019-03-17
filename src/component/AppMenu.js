import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Navbar } from 'react-bootstrap';
import { HamburgerButton } from 'react-hamburger-button';
import VenueList from './VenueList';

class AppMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    }
  }

  handleMenuClick() {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render() {
    return (
      <div>
        <Menu className="venueList" isOpen={this.state.menuOpen}>
          <VenueList {...this.props} handleListItemClick={this.props.handleListItemClick}/>
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
