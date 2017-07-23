import React, { Component } from 'react'
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
    var imgsrc = 'http://ipfs.infura.io'+this.props.image;
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

    const GuestData = HiddenOnlyAuth(() =>
      <span>
        <LoginButtonContainer />
      </span>
    )

    const ImageData = VisibleOnlyAuth(() =>
      <div>
          <img className="logo" width="70px" height="70px" src={this.props.image} alt={'Profile Pic'} />
          <div style={{ color: 'white', 'padding-left': '10px', 'font-size': '16px', 'vertical-align': 'middle' }}>Logged in as:<br /><strong>{this.props.name}</strong></div>
      </div>
    )

    const AuthData = VisibleOnlyAuth(() =>
    //const AuthData = HiddenOnlyAuth(() =>
      <div>
        <div style={{ color: 'white', 'padding-left': '50px' }}> you can currently offer </div>
        <div style={{ color: 'white', 'padding-left': '100px', 'font-size': '30px' }}> { this.props.ether } </div>
        <div style={{ color: 'white', 'padding-left': '30px', 'font-size': '25px' }}> endorsements </div>
        {/*<div> how can I offer more endorsements? <br /><br /></div>*/}
        <div style={{ 'padding-left': '80px' }}> <Link to="/" className="btn btn-default">volunteered</Link><br /><br /> </div>
        <div style={{ 'padding-left': '80px' }}> <Link to="/" className="btn btn-default">created</Link><br /><br /> </div>
        <div style={{ 'padding-left': '80px' }}> <Link to="/" className="btn btn-default">donated</Link><br /><br /> </div>
        <div style={{ 'padding-left': '80px' }}> <Link to="/" className="btn btn-default">endorsed</Link><br /><br /> </div>
      </div>
    )

return(
    <div className="">
      <br />
      <div className="logo">
        <Link to="/proposals" className="logo"><img className="logo" width="80px" height="80px" src={Logo} alt="MetaMesh Logo" /></Link>
        <h1>MetaMesh</h1>
        <br /><br />
      </div>
      <div>
        <ul className="pure-menu-list">
          <GuestData />
          <ImageData />
          <AuthData />
        </ul>
      </div>
    </div>
    )
  }
}

export default DashboardLeftNav
