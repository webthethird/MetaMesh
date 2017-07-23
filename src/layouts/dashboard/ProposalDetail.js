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
      
    var imgsrc = this.state.image = 'https://ipfs.infura.io'+this.props.authData.image.contentUrl;


var single_proposal;
single_proposal = this.getSingleProposal();
console.log(single_proposal);
const listItems = single_proposal.map((proposal) =>
    <div>
      {proposal.title} {this.props.params.index} <br />
      {/*Commits { proposal.details } <br />*/}



      <div className="row">
        <div className="col-sm-6">
          commit &nbsp;
          <TextField
            hintText=""
            id={`endorse_${this.props.params.index}`}
            name={`endorse_${this.props.params.index}`}
           />
          hours
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <span style={{ 'padding-left': '70px' }}>20 out of 100 commitments</span>
          <div className="row">
            <br />
            <div className="col-sm-5"></div>
            <div className=""><RaisedButton primary={true} label="Commit" onClick={()=>{this.endorseProposal(this.props.params.index)}}/></div>
          </div>
        </div>
        <div className="col-sm-6">
          contribute &nbsp;
          <TextField
            hintText=""
            id={`donate_${this.props.params.index}`}
            name={`donate_${this.props.params.index}`}
           />
          eth
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
           <span style={{ 'padding-left': '70px' }}>0.1 out of 2 ETH contributed</span>
          <div className="row">
            <br />
            <div className="col-sm-5"></div>
            <div className=""><RaisedButton primary={true} label="Contribute" onClick={()=>{this.donateEther(this.props.params.index)}}/></div>
          </div>
        </div> <br />
      </div>


      <div className="row">
        <br />
        <h3><b>Goals</b> Connect a new NYC Mesh node at the Consensys office</h3>
        <h3><b>Date</b> July 22-23, 2017</h3>
        <h3><b>Location</b> 49 Bogart St, Brooklyn, NY 11206</h3>
        <h3><b>Task List</b> </h3>
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
           image = { this.state.image }
           name = { this.props.authData.name }
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
