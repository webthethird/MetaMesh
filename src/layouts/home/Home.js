import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'

// UI Components
import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'

// import GoogleMap from 'google-map-react'
console.log(PropTypes);

class Home extends Component {
  static contextTypes = {
    content: PropTypes.object.isRequired
  };
  render() {
    var subtitle = "Internet is a human right. Community mesh networks aim to provide a public stand alone Wi-Fi network that is accessible to all people by installing and maintaining router nodes that share Internet peer-to-peer. However, many meshes are limited by ad-hoc, informal governance.\nMetaMesh is a governance network that aims incentivize growth of mesh networks as a community-owned resource. MetaMesh organizes workforce and funding to optimize our limited resources for the betterment of the network without compromising community run governance. We empower the will of workers over that of the donors by shifting power from those with money to those who give their time and work to the community. Those workers who dedicate their time to MetaMesh projects are given the power and the credentials to influence which projects are taken on by the mesh. ";
    return(
      <main className="container">
        <div className="BillboardPanel">
          <div className="BillboardPanel--content">
              <div className="BillboardPanel--title">
                  MetaMesh
              </div>
              <div className="BillboardPanel--subtitle">
                  {subtitle.split('/n')}
              </div>
              <LoginButtonContainer />
          </div>
        </div>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Good to Go!</h1>
            <p>Your Truffle Box is installed and ready.</p>
            <h2>UPort Authentication</h2>
            <p>This particular box comes with UPort autentication built-in.</p>
            <p>NOTE: To interact with your smart contracts through UPort's web3 instance, make sure they're deployed to the Ropsten testnet.</p>
            <p>In the upper-right corner, you'll see a login button. Click it to login with UPort. There is an authenticated route, "/dashboard", that displays the UPort user's name once authenticated.</p>
            <h3>Redirect Path</h3>
            <p>This example redirects home ("/") when trying to access an authenticated route without first authenticating. You can change this path in the failureRedriectUrl property of the UserIsAuthenticated wrapper on <strong>line 9</strong> of util/wrappers.js.</p>
            <h3>Accessing User Data</h3>
            <p>Once authenticated, any component can access the user's data by assigning the authData object to a component's props.</p>
            <pre><code>
              {"// In component's constructor."}<br/>
              {"constructor(props, { authData }) {"}<br/>
              {"  super(props)"}<br/>
              {"  authData = this.props"}<br/>
              {"}"}<br/><br/>
              {"// Use in component."}<br/>
              {"Hello { this.props.authData.name }!"}
            </code></pre>
            <h3>Further Reading</h3>
            <p>The React/Redux portions of the authentication fuctionality are provided by <a href="https://github.com/mjrussell/redux-auth-wrapper" target="_blank">mjrussell/redux-auth-wrapper</a>.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
