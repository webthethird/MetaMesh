import React, { Component } from 'react'
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router'

class DashboardLeftNav extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(


    <div className="">
      <br />
      <div className="logo">
        
        <Link to="/" className="logo"><img className="logo" width="100px" height="100px" src="https://nycmesh.net/assets/images/logo.png" /></Link> <br /><br />
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
