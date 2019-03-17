import React, { Component } from 'react';

class SideBar extends Component {
  render() {
    return (
      <div className="sideBar">
        <input type={"search"} id={"search"} placeholder={"Filter Venues"} />
      </div>
    );
  }
}

export default SideBar;
