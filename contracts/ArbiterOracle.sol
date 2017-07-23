pragma solidity ^0.4.11;

import "./Oracle.sol";
/*
  simple Oracle that enables an group of trusted arbiters to
  judge on whether the task is fulfilled
*/
contract ArbiterOracle is Oracle {
    address[] arbiterAddresses;
    uint public loggedIn;
    int public result;
    mapping (address => bool) arbiters;

    function ArbiterOracle(address[] trustedDudes){
        arbiterAddresses = trustedDudes;
        for (uint i=0; i< trustedDudes.length; i++){
            arbiters[trustedDudes[i]] = true;
        }
        result = 0;
    }

    function who() returns(address[]) {
        return arbiterAddresses;
    }

    function completed() returns(uint){
        if (loggedIn == arbiterAddresses.length){ //if all have signed
            if (result > 0){ //and hte majority approves
                return 1; //passed
            } else { return 2; } //failed
        } else {return 0;} // judgment still out
    }

    function sign(bool judgement){
        if(arbiters[msg.sender]){
            if (judgement){
                result ++;
            }
            else {
                result--;
            }
            arbiters[msg.sender] = false;
            loggedIn++;
        }
    }
}

