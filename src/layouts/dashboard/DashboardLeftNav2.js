import React, { Component } from 'react'
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router'

import { HiddenOnlyAuth, VisibleOnlyAuth } from '../.././util/wrappers.js'

import LoginButtonContainer from '../.././user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../.././user/ui/logoutbutton/LogoutButtonContainer'



const DashboardLeftNav2 = (props) => {
    
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
           
           <Link to="/" className="logo"><img className="logo" width="100px" height="100px" src="https://nycmesh.net/assets/images/logo.png" /></Link> <br /><br />
           </div>
           <div>
           <ul>
           <OnlyGuestLinks />
           <OnlyAuthLinks />
           </ul>
           </div>
           <div> the mesh network currently has </div>
           <div> { props.ether }</div>
           <div> ETH </div>
           <div> to fund mesh projects <hr /> </div>
           <div> 1 token currently costs </div>
           <div> { props.token } ETH <hr /></div>
           <div> you currently have <br /> </div>
           <div> 20 votes </div>
           <div> 3 commits </div> <br /> <br />
           <div> more account information <br /><br /></div>
           <div> <Link to="/" className="btn btn-default">I want to donate to the mesh</Link> </div>
           
           </div>

    )
    
}

class DashboardContainer extends Component {
    constructor() {
        super();
        this.state = {
        value: null,
        ether: 0,
        vote: 0,
        token: 0
            
        };
    }

    render() {
        return (
    
    <DashboardLeftNav2 ether = { this.state.ether } token = { this.state.token } />
                );
    }
}

export default DashboardContainer
