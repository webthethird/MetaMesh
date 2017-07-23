import React, { Component } from 'react'
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router'
import DashboardLeftNav from './DashboardLeftNav'
import DashboardContainer from '../.././layouts/dashboard/DashboardLeftNav2'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import $ from 'jquery';

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
                    details: this.getCommits(),
                    goals: 'Goal of project',
                    location: 'Brooklyn'
                },
                {
                    contract_address: '',
                    title: 'Fund Project',
                    details: this.getCommits(),
                    goals: 'Goal of project',
                    location: 'Brooklyn'
                }
            ]
        
    };
  }


  getCommits() {
     return 10
     }

  getSingleProposal() {
    return [this.state.proposals[this.props.params.index]]
  }

  volunteer(id) {
    var endorsement = $("#endorse_" + id).val();
    alert(endorsement);
  }

  endorseProposal(id) {
    var endorsement = $("#endorse_" + id).val();
    alert(endorsement);
  }

  donateEther(id) {
    var eth = $("#donate_" + id).val();
    alert(eth);
  }

  render() {


  {/*const listItems = this.state.proposals.map((proposal) =>
    <div>{proposal}</div>
  );*/}


var single_proposal;
single_proposal = this.getSingleProposal();
console.log(single_proposal);
const listItems = single_proposal.map((proposal) =>
    <div> 
      {proposal.title} {this.props.params.index} <br />
      {/*Commits { proposal.details } <br />*/}



      <div className="row">
        <div className="col-sm-6">
          send &nbsp;
          <TextField
            hintText=""
            id={`endorse_${this.props.params.index}`}
            name={`endorse_${this.props.params.index}`}
           />
          endorsements
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <span style={{ 'padding-left': '70px' }}>80 out of 100 endorsements reached</span>
          <div className="row">
            <br />
            <div className="col-sm-5"></div>
            <div className=""><RaisedButton primary={true} label="Commit" onClick={()=>{this.endorseProposal(this.props.params.index)}}/></div>
          </div>
        </div>
        <div className="col-sm-6">
          donate &nbsp;
          <TextField
            hintText=""
            id={`donate_${this.props.params.index}`}
            name={`donate_${this.props.params.index}`}
           />
          eth
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
           <span style={{ 'padding-left': '70px' }}>0.1 out of 2 ETH has been committed</span>
          <div className="row">
            <br />
            <div className="col-sm-5"></div>
            <div className=""><RaisedButton primary={true} label="Commit" onClick={()=>{this.donateEther(this.props.params.index)}}/></div>
          </div>
        </div> <br /> 
      </div>


      <div className="row">
        <br />
        <div><b>Goals</b> { proposal.goals }</div>
        <div><b>Date</b> { proposal.date }</div>
        <div><b>Location</b> { proposal.location }</div>
        <div><b>Task List</b> </div>
        <div className="" style={{ float: 'right', padding: '20px' }} onClick={()=>{this.volunteer(this.props.params.index)}}><RaisedButton secondary={true} label="Volunteer for this project" /></div>
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
