pragma solidity ^0.4.11;

contract Oracle {
    /*
      function should return
      1 if the installment was successfull
      2 if not
      0 if the it is not yet judged
    */
    function completed () returns(uint);
    function who() returns(address[]);
}

