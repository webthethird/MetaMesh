pragma solidity ^0.4.11;

import "./Proposal.sol";

/*
  place to create Proposal,
  keeps track of all existing proposals,
*/
contract ProposalRegistry {
    mapping (address => bool) public proposalExists;
    uint nextId;
    uint proposalLifetime;
    bool initialized = false;
    address public userRegistry;

    /*
      1 = Proposal created
      2 = Proposal accepted/passed
    */
    event Notification(address sender, address proposal, uint code);

    function init(address _userRegistry) returns(bool){
        if (initialized == false) {
            nextId = 1;
            initialized = true;
            userRegistry = _userRegistry;
        }
    }

    function makeProposal(uint _cost, uint _votingTime) returns(address newProposalAddress){
        Proposal newProposal = new Proposal(nextId, _cost, now + _votingTime); //check if id++ work
        nextId++;
        proposalExists[address(newProposal)] = true;
        notify(address(newProposal), 1);
        return address(newProposal);
    }

    function notify(address _contract, uint _code){
        Notification(msg.sender, _contract, _code);
    }

}
