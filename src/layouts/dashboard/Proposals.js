import React, { Component } from 'react'
import { uport, web3 } from './../../util/connectors.js'
import { Link } from 'react-router'
import DashboardLeftNav from './DashboardLeftNav'
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
      image: null,




    proposals: [  {
                contract_address: '0x2512807b14d2830c7ec73d0153e72b4877476fb5',
                title: 'Proposal to install a new node',
                details: this.getCommits(),
                endorsements_reached: 10,
                endorsements_needed: 100,
                funds_donated: 0.3,
                funds_needed:  1,
                goals: 'Goal of project',
                location: 'Brooklyn',

                },
                {
                contract_address: '0xcca1949b0a08aeafdff928ea249f0cad2cc5822c',
                title: 'Fund Project',
                details: this.getCommits(),
                endorsements_reached: 50,
                endorsements_needed: 100,
                funds_donated: 2,
                funds_needed:  3,
                goals: 'New Super Node',
                location: 'Queens'
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

    progress(reached, needed) {
        console.log((reached/needed * 100) + '%');
        return (reached/needed * 100) + '%'

    }

    getSingleProposal() {
        var index = 0;
        if (this.props.params.index) {
            index = this.props.params.index;
        }
        return [this.state.proposals[index]]
    }

    volunteer(id) {
        var endorsement = $("#endorse_" + id).val();
        var task = $("input[name='task']:checked"). val();
        alert(task);
    }


  render() {
    const mnid = require('mnid')
    function checkAddressMNID (addr) {
      if (mnid.isMNID(addr)) {
        return mnid.decode(addr).address
      } else {
        return addr
      }
    }
    var address = this.props.authData.uportId = checkAddressMNID(this.props.authData.address);
    console.log('decoded address:',address);
    console.log('authData:',this.props.authData);
    var imgsrc = this.state.image = 'https://ipfs.infura.io'+this.props.authData.image.contentUrl;
    console.log(imgsrc);

    function ProposalRegistrySetup () {
      let ProposalRegistryABI = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_userRegistry","type":"address"}],"name":"init","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"proposalExists","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getLastProposalIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_contract","type":"address"},{"name":"_code","type":"uint256"}],"name":"notify","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"userRegistry","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_cost","type":"uint256"},{"name":"_votingTime","type":"uint256"},{"name":"workers","type":"uint256[]"},{"name":"_oracle","type":"address"}],"name":"makeProposal","outputs":[{"name":"newProposalAddress","type":"address"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"proposal","type":"address"},{"indexed":false,"name":"code","type":"uint256"}],"name":"Notification","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"x","type":"uint256"}],"name":"fb","type":"event"}])
      let ProposalRegistryContractObj = ProposalRegistryABI.at('0x8851645a82c1dff99c8911d2541c780eae48ed21')
      return ProposalRegistryContractObj
    }
    const ProposalRegistryContract = ProposalRegistrySetup()

    function getProposalsLength () {
         ProposalRegistryContract.getLastProposalIndex
            .call((error, size) => {
                var proposalNum = size.toNumber()
                console.log('num',proposalNum)
                getProposalAddresses(proposalNum)
                // return proposalNum
            })
    }

    ProposalRegistryContract.proposals.call(1, (addr) => {
      console.log('first addr',addr);
    })

    var propAddr = []
    var propObjs = []
    function getProposalAddresses (num) {
        for (var i=0; i<num; i++){
            ProposalRegistryContract.proposals.call(i, (error, _addr) => {
              if(error) { console.log('err',error); }
              console.log('Proposal Addr:',_addr);
                propAddr.push(_addr)
                propObjs.push(ProposalSetup(_addr))
                console.log('PropObj', propObjs)
            })
        }
        // getProposalObjects(propAddr)
        console.log('all?',propAddr)
    }
    getProposalsLength()
    // function getProposalObjects(r) {
    //   for (var i = 0; i < r.length; i++) {
    //     var proposal = ProposalSetup(r[i])
    //     console.log(proposal)
    //     propObjs.push(proposal)
    //   }
    // }

    function UserRegistrySetup () {
      let UserRegistryABI = web3.eth.contract([{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"addBalance","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_amount","type":"uint256"}],"name":"subtractBalance","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"_proposalRegistry","type":"address"},{"name":"firstUser","type":"address"},{"name":"initialUserBalance","type":"uint256"}],"payable":false,"type":"constructor"}])
      let UserRegistryContractObj = UserRegistryABI.at('0x84f38334ad5d06cfcf2c3b4c78d2dc09663602fe')
      return UserRegistryContractObj
    }
    const UserRegistryContract = UserRegistrySetup()

    UserRegistryContract.balanceOf.call(address, (error, bal) => {
      if (error) { throw error }
      console.log('Token balance:',bal);
      this.setState({balance: bal.s});
      this.props.authData.balance = bal.s;
    })

    function OracleSetup () {
      let OracleABI = web3.eth.contract([{"constant":true,"inputs":[],"name":"loggedIn","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"judgement","type":"bool"}],"name":"sign","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"result","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"completed","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"who","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"inputs":[{"name":"trustedDudes","type":"address[]"}],"payable":false,"type":"constructor"}])
      let OracleContractObj = OracleABI.at('0x8a4edf7d2c432b94bb9e2dc7ac892d41edd2dfba');
      return OracleContractObj;
    }
    const OracleContract = OracleSetup();

    function ProposalSetup (address) {
      let ProposalABI = web3.eth.contract([{"constant":true,"inputs":[],"name":"votingDeadline","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"cost","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"endorse","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"volunteers","outputs":[{"name":"workerAddress","type":"address"},{"name":"role","type":"uint256"},{"name":"time","type":"uint256"},{"name":"reward","type":"uint256"},{"name":"free","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"oracle","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"supporter","type":"address"}],"name":"withdrawVotes","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"proposalState","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"reportCompletion","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"endorsements","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"fund","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"roles","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalVotesNeeded","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"workforceComplete","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getTotalFunds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"role","type":"uint256"}],"name":"commit","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_id","type":"uint256"},{"name":"_cost","type":"uint256"},{"name":"_votingDeadline","type":"uint256"},{"name":"_votesNeeded","type":"uint256"},{"name":"workers","type":"uint256[]"},{"name":"_oracle","type":"address"}],"payable":false,"type":"constructor"}])
      let ProposalContractObj = ProposalABI.at(address);
      return ProposalContractObj;
    }

    // TODO listen to event to get proposal address
    function makeProposal() {//(cost, votetime, roles, oracle) {
      var cost = web3.toWei('1', 'ether');
      var votetime = 604800;
      var roles = [12];
      var oracle = '0x8a4edf7d2c432b94bb9e2dc7ac892d41edd2dfba';
      ProposalRegistryContract.makeProposal(cost, votetime, roles, oracle, (error, proposal) => {
        if (error) {
          console.log('proposal failed');
          throw error
        }
        web3.eth.getTransactionReceipt(proposal, function(rct) {
          console.log(rct.logs[0].args)
        });
      })
    }

    const waitForMined = (txHash, response, pendingCB, successCB) => {
      if (response.blockNumber) {
        successCB()
      } else {
        pendingCB()
        pollingLoop(txHash, response, pendingCB, successCB)
      }
    }

    // Recursive polling to do continuous checks for when the transaction was mined
    const pollingLoop = (txHash, response, pendingCB, successCB) => {
      setTimeout(function () {
        web3.eth.getTransaction(txHash, (error, response) => {
          if (error) { throw error }
          if (response === null) {
            response = { blockNumber: null }
          } // Some ETH nodes do not return pending tx
          waitForMined(txHash, response, pendingCB, successCB)
        })
      }, 1000) // check again in one sec.
    }

    const listItems = this.state.proposals.map((proposal, index) =>
    <div>
      <Link to={`/proposal/${index}`}>{proposal.title}</Link> <br />
      {/*Commits { proposal.details } <br />*/}

      <div className="row">
        <div className="col-sm-6">
          commit &nbsp;
          <TextField
            name="endorse"
            hintText=""
            id={`endorse_${index}`}
            name={`endorse_${index}`}
           />
          hours
                                               <div className="progress">
                                               <div className="progress-bar" role="progressbar" style={{ width: this.progress(proposal.endorsements_reached, proposal.endorsements_needed) }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                               </div>
                                               <span style={{ 'padding-left': '70px' }}>{ proposal.endorsements_reached } out of { proposal.endorsements_needed } hours committed</span>
          <div className="row">
            <br />
            <div className="col-sm-5"></div>
            <div className=""><RaisedButton primary={true} label="Volunteer" onClick={()=>{this.endorseProposal(index)}}/></div>
          </div>
        </div>
        <div className="col-sm-6">
          contribute &nbsp;
          <TextField
            hintText=""
            id={`donate_${index}`}
            name={`donate_${index}`}
           />
          eth
                                               <div className="progress">
                                               <div className="progress-bar" role="progressbar" style={{ width: this.progress(proposal.funds_donated, proposal.funds_needed) }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                               </div>
                                               <span style={{ 'padding-left': '70px' }}>{ proposal.funds_donated } out of { proposal.funds_needed } ETH contributed</span>
          <div className="row">
            <br />
            <div className="col-sm-5"></div>
            <div className=""><RaisedButton primary={true} label="Contribute" onClick={()=>{this.donateEther(index)}}/></div>
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
         balance = { this.state.balance }
        token_cost = { this.state.token_cost }
        votes = { this.state.votes }
        commits = { this.state.commits }
        image = { this.state.image }
        name = { this.props.authData.name }
    />
    </div>
    <div className="col-sm-9">
      <h2> Proposals </h2>
      <div className=""><RaisedButton primary={false} label="New Proposal" onClick={()=>{makeProposal()}}/></div>
        {listItems}
    </div>
  </div>
</div>





    )
  }
}

export default Proposals
