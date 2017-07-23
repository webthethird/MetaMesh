pragma solidity ^0.4.11;

import "./ProposalRegistry.sol";
import "./UserRegistry.sol";

/*
  a created Proposal
  users can stake on it
*/
contract Proposal {
    address proposalRegistry;
    uint public id;
    uint public cost;
    mapping (address => uint) votes;
    mapping (address => uint) funds;
    uint public totalVotes;
    State public proposalState;
    uint public votingDeadline;
    address[] supporters;
    address[] donors;
    bytes32 data;
   
    enum State {
        Proposed,
        InProgress,
        Completed,
        Rejected
    }

    function getBalance() returns(uint){
        return this.balance;
    }

    modifier onlyBefore(uint _time) { if (now >= _time) killAndRefund(); _; }

    modifier onlyInStage(State _state) {
        require(proposalState == _state);
        _;
    }

    function Proposal(uint _id, uint _cost, uint _votingDeadline){
        proposalRegistry = msg.sender;
        id = _id;
        cost = _cost;
        votingDeadline = _votingDeadline;
    }

    /*
      called to back the proposal
    */
    function vote(uint amount)
        onlyBefore(votingDeadline)
        onlyInStage(State.Proposed) { //what to return? bool? or fire an event?

        //if the contribution is >0 and can be subtracted from the account
        if (amount > 0 &&
             UserRegistry(ProposalRegistry(proposalRegistry).userRegistry()).subtractBalance(msg.sender, amount)) {
            //if this is the first time, add to the list of supporters
            if (votes[msg.sender] == 0) {
                supporters.push(msg.sender);
            }
            votes[msg.sender] += amount;
            //remember votes
            totalVotes += amount;
        }
        // if enough support
        checkReady();
    }

    function checkReady() internal {
        if (this.balance >= cost && //donor money is there?
            totalVotes >= UserRegistry(ProposalRegistry(proposalRegistry).userRegistry()).totalSupply() / 2) //project supported by workers?
            //check as well if people are signed up?
            {
                ProposalRegistry(proposalRegistry).notify(address(this),2);
                proposalState = State.InProgress;
        }
    }

    function fund()
        payable
        onlyBefore(votingDeadline)
            onlyInStage(State.Proposed) {
        if (funds[msg.sender] == 0) {
            donors.push(msg.sender);
        }
        funds[msg.sender] += msg.value;
    }

    function withdrawVotes(address supporter){
        // later: adjust how much to withdraw
        if (supporter == msg.sender && msg.sender == address(this)){
            UserRegistry(ProposalRegistry(proposalRegistry).userRegistry()).addBalance(supporter, votes[msg.sender]);
            votes[msg.sender] = 0;
        }
    }

    function killAndRefund() internal {
        refundMeshTokens();
    }

    function reportCompletion() onlyInStage(State.InProgress){
        //how to check whether that is true???
        refundMeshTokens();
    }

   function refundMeshTokens() internal {
        for (uint i=0; i<supporters.length; i++){
            withdrawVotes(supporters[i]);
        }
    }

}

