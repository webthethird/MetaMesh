pragma solidity ^0.4.11;

import "./Proposal.sol";
import "./UserRegistry.sol";

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
    address[] public proposals;
    uint xOfMembersToAgree;

    /*
      1 = Proposal created
      2 = Proposal accepted/passed
      12 = Volunteer: buy antenna
      13 = 
    */
    event Notification(address sender, address proposal, uint code);

    function init(address _userRegistry) returns(bool){
        if (initialized == false) {
            nextId = 1;
            initialized = true;
            userRegistry = _userRegistry;
            xOfMembersToAgree = 3;
        }
    }

    function makeProposal(uint _cost, uint _votingTime) returns(address newProposalAddress){
        //TODO create volunteers
        /* uint[] workers; */
        Proposal newProposal = new Proposal(nextId,
                                            _cost,
                                            now + _votingTime,
                                            UserRegistry(userRegistry).totalSupply() / xOfMembersToAgree
                                            /* workers */
                                            ); //check if id++ work
        nextId++;
        proposalExists[address(newProposal)] = true;
        proposals.push(address(newProposal));
        notify(address(newProposal), 1);
        return address(newProposal);
    }

    function notify(address _contract, uint _code){
        Notification(msg.sender, _contract, _code);
    }
}
