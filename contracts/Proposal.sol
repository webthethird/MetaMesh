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
    Volunteer[] public volunteers;
    uint[] public roles;
    uint public totalVotesNeeded;
    address oracle;
    enum State {
        Proposed,
        InProgress,
        Completed,
        Rejected,
        Failed
    }

    /*
      code for role and default values:
      12: buy antenna -> 1 hour, 1 ether
      13: install antenna: 2 hours, 0 ether
      14: come along and watch: 1 hours, 0 ether
    */
    struct Volunteer {
        address workerAddress;
        uint role;
        uint time;
        uint reward;
        bool free;
    }


    function getBalance() returns(uint){
        return this.balance;
    }

    modifier onlyBefore(uint _time) { if (now >= _time) throw; _; }

    modifier onlyInStage(State _state) {
        require(proposalState == _state);
        _;
    }

    function Proposal(uint _id,
                      uint _cost,
                      uint _votingDeadline,
                      uint _votesNeeded,
                      uint[] workers,
                      address _oracle){
        proposalRegistry = msg.sender;
        id = _id;
        cost = _cost;
        votingDeadline = _votingDeadline;
        totalVotesNeeded = _votesNeeded;
        roles = workers;
        oracle = _oracle;
        for (uint i=0; i<workers.length; i++){
            //attention hacky!! number must be 12, 14, or 14!!
            uint time2work;
            uint payout = 0;
            if (workers[i] == 12) { // volunteer buys antenna
                time2work =1;
                payout = cost;
            }
            if (workers[i] == 13) { // volunteer installs antenna
                time2work =2;
            }
            else { // volunteer is beginner and learns
                time2work = 1;
            }
            volunteers.push(Volunteer(msg.sender, workers[i], time2work, payout, true));
        }
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
            // if enough support
            checkReady();
        }
    }

    function commit(uint role) onlyInStage(State.Proposed) {
        //whoaaaah hackkky shit!!
        uint idx = 0;
        for (uint j=0; j<roles.length;j++){
            if (roles[j] == role){
                idx = j;
            }
        }
        if (volunteers[idx].free && //role is still needed
            UserRegistry(ProposalRegistry(proposalRegistry).userRegistry()).subtractBalance(msg.sender, volunteers[idx].time))
            { //and volunteer can stake
            volunteers[idx].workerAddress = msg.sender;
            volunteers[idx].free = false;
            ProposalRegistry(proposalRegistry).notify(msg.sender,role);
            checkReady();
        }
    }

    function checkReady() internal {
        if (this.balance > cost && //donor money is there?
            endorsements >= totalVotesNeeded &&  //project supported by workers?
            workforceComplete()) //enoguh people signed up
            {
                ProposalRegistry(proposalRegistry).notify(address(this),2);
                proposalState = State.InProgress;
        }
    }

    function workforceComplete() returns(bool){
        for (uint i=0; i<roles.length; i++){
            if( volunteers[i].free ){
                return false;
            }
        }
        return true;
    }

    function fund()
        payable
        onlyBefore(votingDeadline)
        onlyInStage(State.Proposed) {
        if (funds[msg.sender] == 0) {
            donors.push(msg.sender);
        }
        funds[msg.sender] += msg.value;
        checkReady();
    }

    function getTotalFunds() returns(uint){
        return this.balance;
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
        if (Oracle(oracle).completed() == 1){
            //refund tokenHolders
            refundMeshTokens();
            for (uint i=0; i<roles.length; i++){
                //refund volunteers
                UserRegistry(ProposalRegistry(proposalRegistry).userRegistry()).addBalance(volunteers[i].workerAddress, volunteers[i].time);
                //reward with extra tokens volunteers
                 UserRegistry(ProposalRegistry(proposalRegistry).userRegistry()).mint(volunteers[i].workerAddress, volunteers[i].time);
                //pays volunteers for money spent
                 if (volunteers[i].workerAddress.send(volunteers[i].reward)){ 
                        ProposalRegistry(proposalRegistry).notify(volunteers[i].workerAddress, 99);
                }
            }
            ProposalRegistry(proposalRegistry).notify(address(this), 50);
            proposalState = State.Completed;
        }
        // failed
        /* if (Oracle(oracle).completed() == 2){ */
        /*     //refundMeshTokens */
        /*     refundMeshTokens(); */
        /*     //burn tokens of volunteers */
        /*     for (uint j=0; i<roles.length; i++){ */
        /*         UserRegistry(ProposalRegistry(proposalRegistry).userRegistry()).burn(volunteers[j].time); */
        /*     //refund donors */
        /*     } */
        /*     refundDonors(); */
        /*     proposalState = State.Failed; */
        /* } */
            //judgment still pending
    }

   function refundMeshTokens() internal {
        for (uint i=0; i<supporters.length; i++){
            withdrawVotes(supporters[i]);
        }
    }

   function refundDonors() internal returns(bool success){
       for (uint i=0; i<donors.length; i++){
           success = success && donors[i].send(funds[donors[i]]);
        }
   }

}

