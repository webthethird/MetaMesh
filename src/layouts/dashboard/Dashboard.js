import React, { Component } from 'react'
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router'
import DashboardLeftNav from './DashboardLeftNav'
import DashboardContainer from '../.././layouts/dashboard/DashboardLeftNav2'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      value: null,
      ether: 0,
      token_cost: 0.04,
      votes: 10,
      commits: 15
        
    };
  }

  render() {
    console.log(this.props.authData);

    return(




<div className="container-fluid">
  <div className="row">
    <div className="col-sm-3 left-nav">
      <DashboardLeftNav 
        ether = { this.state.ether } 
        token_cost = { this.state.token_cost }
        votes = { this.state.votes } 
        commits = { this.state.commits } 
    />
    </div>
    <div className="col-sm-9">
      <h2> Dashboard </h2>
    </div>
  </div>
</div>





    )
  }
}

export default Dashboard
