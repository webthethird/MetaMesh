import React, { Component } from 'react'
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router'
import DashboardLeftNav from './DashboardLeftNav'

class Dashboard2 extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(




<div className="container-fluid">
  <div className="row">
    <div className="col-sm-3 left-nav">
      <DashboardLeftNav />
    </div>
    <div className="col-sm-9">
      <h1> Dashboard </h1>
    </div>
  </div>
</div>





    )
  }
}

export default Dashboard2
