pragma solidity ^0.4.11;

contract Oracle {
    /*
      function should return
      1 if the installment was successfull
      2 if not
      0 if the it is not yet judged
    */
    function completed () returns(uint);
}

/*
  simple Oracle that enables an group of trusted arbiters to
  judge on whether the task is fulfilled
*/
contract SimpleSignatureOracle is Oracle {
    address[] arbiterAddresses;
    uint loggedIn;
    uint result;
    mapping (address => bool) arbiters;

    function SimpleSignatureOracle(address[] trustedDudes){
        arbiterAddresses = trustedDudes;
        for (uint i=0; i< trustedDudes.length; i++){
            arbiters[trustedDudes[i]] = true; 
        }
        result =0;
    }
    function completed() returns(uint){
        if (loggedIn == arbiterAddresses.length){ //if all have signed
            if (result > 0){ //and hte majority approves
                return 1; //passed
            } else {return 2;} //failed
        } else {return 0;} // judgment still out
    }


    function sign(bool judgement){
        if(arbiters[msg.sender]){
            if (judgement){
                result ++;
            } else {result--;}
            loggedIn++;
        }
    }
}

