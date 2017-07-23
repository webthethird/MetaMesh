import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import DashboardLeftNav from './layouts/dashboard/DashboardLeftNav'
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'
import './bootstrap-3.3.7-dist 2/css/bootstrap.css'
import Logo from './img/MetaMesh_icon.svg'

// Styles
import './css/ubuntu.css'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/profile" className="pure-menu-link">Profile</Link>
        </li>
        <LogoutButtonContainer />
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <LoginButtonContainer />
      </span>
    )

    return (
      <div className="App">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <div className="logo">
                <Link to="/" className="logo"><img className="logo" width="100px" height="100px" src={Logo} alt="MetaMesh Logo" /></Link>
                <br />
                <h2>MetaMesh</h2>
                <br /><br />
              </div>
            </li>
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        </div>


        {this.props.children}
      </div>
    );
  }
}

export default App
