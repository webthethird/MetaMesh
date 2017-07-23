import React, { Component } from 'react'
import { uport, web3 } from './../../util/connectors.js'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'

import DashboardLeftNav from './DashboardLeftNav'
import DashboardContainer from '../.././layouts/dashboard/DashboardLeftNav2'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


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
    console.log(web3);
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
      var ProposalABI = web3.eth.contract([{"constant":false,"inputs":[{"name":"share","type":"uint256"}],"name":"updateShares","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}])
      var ProposalContractObj = ProposalABI.at('0x432472827c271b795402cd385df9f425d0bf1cfe')
      return ProposalContractObj
    }
    const ProposalContract = ProposalSetup()

    function ProposalRegistrySetup () {
      var ProposalRegistryABI = web3.eth.contract([{"constant":false,"inputs":[{"name":"share","type":"uint256"}],"name":"updateShares","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}])
      var ProposalRegistryContractObj = ProposalRegistryABI.at('0x432472827c271b795402cd385df9f425d0bf1cfe')
      return ProposalRegistryContractObj
    }
    const ProposalRegistryContract = ProposalRegistrySetup()

    ProposalContract.getShares
    .call(address, (error, sharesNumber) => {
      const sharesNumberDecoded = sharesNumber.toNumber()
      console.log('Shares',sharesNumberDecoded);
      return sharesNumberDecoded
    })
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
