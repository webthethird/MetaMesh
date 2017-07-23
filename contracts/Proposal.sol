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
    uint public endorsements;
    State public proposalState;
    uint public votingDeadline;
    address[] supporters;
    address[] donors;
    bytes32 data;
    Volunteer[] volunteers;
    uint totalVotesNeeded;
   
    enum State {
        Proposed,
        InProgress,
        Completed,
        Rejected
    }
    struct  Volunteer {
        address workerAddress;
        uint role;  //code for role
        uint time;
        uint reward;
        bool free;
    }

    /*
      code for role and default values:
      1: buy antenna -> 1 hour, 1 ether
      2: install antenna: 2 hours, 0 ether
      3: come along and watch: 1 hours, 0 ether
    */

    function getBalance() returns(uint){
        return this.balance;
    }

    modifier onlyBefore(uint _time) { if (now >= _time) killAndRefund(); _; }

    modifier onlyInStage(State _state) {
        require(proposalState == _state);
        _;
    }

    /* function Proposal(uint _id, uint _cost, uint _votingDeadline, uint _votesNeeded, uint[] _roles){ */
    function Proposal(uint _id, uint _cost, uint _votingDeadline, uint _votesNeeded){
        proposalRegistry = msg.sender;
        id = _id;
        cost = _cost;
        votingDeadline = _votingDeadline;
        /* volunteers = _roles; */
        totalVotesNeeded = _votesNeeded;
    }

    /*
      called to back the proposal
    */
    function endorse(uint amount)
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
            endorsements += amount;
        }
        // if enough support
        checkReady();
    }

    function volunteer(uint role) onlyInStage(State.Proposed) {
        if (volunteers[role].free && //role is still needed
            UserRegistry(ProposalRegistry(proposalRegistry).userRegistry()).subtractBalance(msg.sender, volunteers[role].time)) { //and volunteer can stake
            volunteers[role].workerAddress = msg.sender;
            volunteers[role].free = false;
            ProposalRegistry(proposalRegistry).notify(msg.sender,role);
        }
    }

    function checkReady() internal {
        if (this.balance >= cost && //donor money is there?
            endorsements >= totalVotesNeeded &&  //project supported by workers?
            workforceCompleteCheck()) //enoguh people signed up
            {
                ProposalRegistry(proposalRegistry).notify(address(this),2);
                proposalState = State.InProgress;
        }
    }

    function workforceCompleteCheck() internal returns(bool missing){
        for (uint i=0; i<volunteers.length; i++){
            missing = missing && volunteers[i].free;
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

