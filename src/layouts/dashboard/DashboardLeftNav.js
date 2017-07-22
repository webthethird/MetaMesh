import React, { Component } from 'react'
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router'

import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'

import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'

import Logo from '../../img/MetaMesh_icon.svg'

class DashboardLeftNav extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

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
    return(


    <div className="">
      <br />
      <div className="logo">
        <Link to="/" className="logo"><img className="logo" width="80px" height="80px" src={Logo} alt="MetaMesh Logo" /></Link>
        <h1>MetaMesh</h1>
        <br /><br />
      </div>
      <div>
        <ul className="pure-menu-list">
          <OnlyGuestLinks />
          <OnlyAuthLinks />
        </ul>
      </div>
      <div> the mesh network currently has </div>
      <div> 352,000 </div>
      <div> ETH </div>
      <div> to fund mesh projects <hr /> </div>
      <div> 1 token currently costs </div>
      <div> 0.04 ETH <hr /></div>
      <div> you currently have <br /> </div>
      <div> 20 votes </div>
      <div> 3 commits </div> <br /> <br />
      <div> more account information <br /><br /></div>
      <div> <Link to="/" className="btn btn-default">I want to donate to the mesh</Link> </div>

    </div>





    )
  }
}

export default DashboardLeftNav
