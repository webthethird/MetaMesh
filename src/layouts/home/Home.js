import React, { PropTypes, Component } from 'react'

// UI Components
import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import Logo from '../../img/MetaMesh_icon.svg'

// import GoogleMap from 'google-map-react'
console.log(PropTypes);

class Home extends Component {
  render() {
    var subtitle = "Internet is a human right. Community mesh networks aim to provide a public stand alone Wi-Fi network that is accessible to all people by installing and maintaining router nodes that share Internet peer-to-peer. However, many meshes are limited by ad-hoc, informal governance.";
    var subtitle2 = "MetaMesh is a governance network that aims incentivize growth of mesh networks as a community-owned resource. MetaMesh organizes workforce and funding to optimize our limited resources for the betterment of the network without compromising community run governance. We empower the will of workers over that of the donors by shifting power from those with money to those who give their time and work to the community. Those workers who dedicate their time to MetaMesh projects are given the power and the credentials to influence which projects are taken on by the mesh. ";
    return(
      <main className="container">
        <div className="BillboardPanel">
          <div className="BillboardPanel--content">
            <div className="logo">
              <img className="logo" width="280px" height="280px" src={Logo} alt="MetaMesh Logo" />
            </div>
            <div className="BillboardPanel--title">
                MetaMesh
            </div>
            <div className="BillboardPanel--subtitle">
                {subtitle}<br/><br/>{subtitle2}
            </div>
            <LoginButtonContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Home
