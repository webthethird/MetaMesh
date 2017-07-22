import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'
import './bootstrap-3.3.7-dist 2/css/bootstrap.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

// Styles
import './css/ubuntu.css'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    {
    // const OnlyAuthLinks = VisibleOnlyAuth(() =>
    //   <span>
    //     <li className="pure-menu-item">
    //       <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
    //     </li>
    //     <li className="pure-menu-item">
    //       <Link to="/profile" className="pure-menu-link">Profile</Link>
    //     </li>
    //     <LogoutButtonContainer />
    //   </span>
    // )
    //
    // const OnlyGuestLinks = HiddenOnlyAuth(() =>
    //   <span>
    //     <LoginButtonContainer />
    //   </span>
    // )
  }

    return (
      <MuiThemeProvider>
        <div className="App">
        {// <nav className="navbar pure-menu pure-menu-horizontal">
          //   <Link to="/" className="pure-menu-heading pure-menu-link">MetaMesh</Link>
          //   <ul className="pure-menu-list navbar-right">
          //   </ul>
          // </nav
        }

        {this.props.children}
      </div></MuiThemeProvider>
    );
  }
}

export default App
