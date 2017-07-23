var ArbiterOracle = artifacts.require("./ArbiterOracle.sol");
var accounts = web3.eth.accounts
var arbiters = [accounts[0]]
//Bills uport address
//demoAddress = xxxx

module.exports = function(deployer) {
    accounts = web3.eth.accounts
    deployer.then(function(){
        return deployer.deploy(ArbiterOracle, arbiters)
    })
}
