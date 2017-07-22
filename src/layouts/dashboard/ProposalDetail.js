import React, { Component } from 'react'
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router'
import DashboardLeftNav from './DashboardLeftNav'
import DashboardContainer from '../.././layouts/dashboard/DashboardLeftNav2'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class ProposalDetail extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      value: null,
      ether: 0,
      token_cost: 0.04,
      votes: 10,
      commits: 15,




             proposals: [  {
                    contract_address: '',
                    title: 'Proposal to install a new node',
                    details: this.getCommits()
                },
                {
                    contract_address: '',
                    title: 'Fund Project',
                    details: this.getCommits()
                }
            ]
        
    };
  }


  getCommits() {
     return 10
     }

  getSingleProposal(index) {
    return this.state.proposals[index]
  }

  render() {


  {/*const listItems = this.state.proposals.map((proposal) =>
    <div>{proposal}</div>
  );*/}


var single_proposal;
single_proposal = this.getSingleProposal(0);
const listItems = this.state.proposals.map((proposal) =>
    <div> 
      <Link to="/dashboard"> {proposal.title}</Link> <br />
      {/*Commits { proposal.details } <br />*/}



      <div className="row">
        <div className="col-sm-6">
          send &nbsp;
          <TextField
            hintText=""
           />
          endorsements
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          80 out of 100 endorsements reached
        </div>
        <div className="col-sm-6">
          donate &nbsp;
          <TextField
            hintText=""
           />
          eth
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
           0.1 out of 2 ETH has been committed
        </div> <br /> 
      </div>

      <div className="row">
        <br />
        <div className="col-sm-5"></div>
        <div className=""><RaisedButton primary={true} label="Commit" /></div>
      </div>



    </div>
  );

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
      <h2> Proposals </h2>
      {listItems}
    </div>
  </div>
</div>





    )
  }
}

export default ProposalDetail
