import React, { Component } from 'react'
import { Link } from 'react-router'
import DashboardLeftNav from '../../../layouts/dashboard/DashboardLeftNav'

import LoginButtonContainer from '../../ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../ui/logoutbutton/LogoutButtonContainer'

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    console.log(this.props.authData);
    var picURL = "ipfs.infura.io"+this.props.authData.image.contentUrl;
    return(
      <main className="container-fluid">
        <div className="row">
          <div className="col-sm-3 left-nav">
            <DashboardLeftNav />
          </div>
          <div className="col-sm-9">
            <h1>Profile</h1>
            <img>{picURL}</img>
            <p>Change these details in UPort to see them reflected here.</p>
            <p>
              <strong>Name</strong><br />
              {this.props.authData.name}
            </p>
            <p>
              <strong>Address</strong><br />
              {this.props.authData.address}
            </p>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
