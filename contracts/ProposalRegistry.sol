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
      13 = Volunteer found to install antenna
      14 = Volunteer found to come along and learn
      99 = volunteer got paid
      50 = proposal completed
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
    event fb(uint x);
    function makeProposal(uint _cost, uint _votingTime, uint[] workers) returns(address newProposalAddress){
        uint votesNeeded = UserRegistry(userRegistry).totalSupply() / xOfMembersToAgree;
        /* fb(votesNeeded); */
        /* fb(UserRegistry(userRegistry).totalSupply()); */
        Proposal newProposal = new Proposal(nextId,
                                            _cost,
                                            now + _votingTime,
                                            votesNeeded,
                                            workers
                                            ); //check if id++ work
        nextId++;
        address proposalAddress = address(newProposal);
        proposalExists[proposalAddress] = true;
        proposals.push(proposalAddress);
        notify(proposalAddress, 1);
        return proposalAddress;
    }

    function notify(address _contract, uint _code){
        Notification(msg.sender, _contract, _code);
    }
}
