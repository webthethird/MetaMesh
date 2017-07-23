import React, { Component } from 'react'
import { uport, web3 } from './../../util/connectors.js'
import { Link } from 'react-router'
import DashboardLeftNav from './DashboardLeftNav'
import DashboardContainer from '../.././layouts/dashboard/DashboardLeftNav2'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'
import $ from 'jquery';

class Proposals extends Component {
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

  endorseProposal(id) {
    var endorsement = $("#endorse_" + id).val();
    alert(endorsement);
  }

  donateEther(id) {
    var eth = $("#donate_" + id).val();
    alert(eth);
  }

  render() {
    console.log(this.props.authData);
    //
    const mnid = require('mnid')
    function checkAddressMNID (addr) {
      if (mnid.isMNID(addr)) {
        return mnid.decode(addr).address
      } else {
        return addr
      }
    }
    // var address = checkAddressMNID(this.props.authData.address);
    var address = web3.eth.getCoinbase();
    console.log('decoded address:',address);

    function ProposalSetup () {
      let ProposalABI = web3.eth.contract([{"constant":false,"inputs":[{"name":"share","type":"uint256"}],"name":"updateShares","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}])
      let ProposalContractObj = ProposalABI.at('0x432472827c271b795402cd385df9f425d0bf1cfe')
      return ProposalContractObj
    }
    const ProposalContract = ProposalSetup()

    function getVotes () {
      ProposalContract.totalVotes
      .call(address, (error, votes) => {
        const voteNumberDecoded = votes.toNumber()
        console.log('Shares',voteNumberDecoded);
        this.state.votes = voteNumberDecoded;
        return voteNumberDecoded
      })
    }

    const listItems = this.state.proposals.map((proposal, index) =>
    <div>
      <Link to={`/proposal/${index}`}>{proposal.title}</Link> <br />
      {/*Commits { proposal.details } <br />*/}

      <div className="row">
        <div className="col-sm-6">
          send &nbsp;
          <TextField
            name="endorse"
            hintText=""
            id={`endorse_${index}`}
            name={`endorse_${index}`}
           />
          endorsements
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <span style={{ 'padding-left': '70px' }}>80 out of 100 endorsements reached</span>
          <div className="row">
            <br />
            <div className="col-sm-5"></div>
            <div className=""><RaisedButton primary={true} label="Commit" onClick={()=>{this.endorseProposal(index)}}/></div>
          </div>
        </div>
        <div className="col-sm-6">
          donate &nbsp;
          <TextField
            hintText=""
            id={`donate_${index}`}
            name={`donate_${index}`}
           />
          eth
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
           <span style={{ 'padding-left': '70px' }}>0.1 out of 2 ETH has been committed</span>
          <div className="row">
            <br />
            <div className="col-sm-5"></div>
            <div className=""><RaisedButton primary={true} label="Commit" onClick={()=>{this.donateEther(index)}}/></div>
          </div>
        </div> <br />
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

export default Proposals
