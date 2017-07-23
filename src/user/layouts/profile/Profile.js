import React, { Component } from 'react'
import { uport } from './../../../util/connectors.js'

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    console.log(this.props.authData);
    console.log(uport);
    var address = this.props.authData.address;
    // var addr = window.uportconnect.MNID.decode(address)
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
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
