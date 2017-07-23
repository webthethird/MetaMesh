pragma solidity ^0.4.11;

import "./Proposal.sol";
import "./ProposalRegistry.sol";

/*
  keeps track of the users token balances,
  is linked to the ProposalRegistry
*/
contract UserRegistry{
    address proposalRegistry;
    mapping (address => uint) public balances;
    uint public totalSupply;

    modifier onlyProposal() {
        require(ProposalRegistry(proposalRegistry).proposalExists(msg.sender));
        _;
    }

    function UserRegistry(address _proposalRegistry, address firstUser, uint initialUserBalance){
        proposalRegistry = _proposalRegistry;
        balances[firstUser] = initialUserBalance;
        totalSupply = initialUserBalance;
    }

    function addBalance(address _to, uint _amount) onlyProposal() returns(bool) {
        if (balances[_to] + _amount > balances[_to]){
            balances[_to] += _amount;
            return true;
        }
        else {
            return false;
        }
    }

    function subtractBalance(address _from, uint _amount) onlyProposal() returns(bool) {
        if (balances[_from] > _amount){
            balances[_from] -= _amount;
            return true;
        }
        return false;
    }

    function transfer(address _to, uint _amount) returns(bool) {
        if (balances[msg.sender] > _amount &&
            balances[_to] + _amount > balances[_to]) {
            balances[msg.sender] -= _amount;
            balances[_to] += _amount;
            return true;
        }
        else {
            return false;
        }
    }

    function mint(address _to, uint amount) onlyProposal() {
        if (balances[_to] + amount > balances[_to]){
            balances[_to] += amount;
            totalSupply += amount;
        }
    }
}
