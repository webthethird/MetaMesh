var ProposalRegistry = artifacts.require("./ProposalRegistry.sol");
var UserRegistry = artifacts.require("./UserRegistry.sol");
var ArbiterOracle = artifacts.require("./ArbiterOracle.sol");
var accounts = web3.eth.accounts
var initialBalance = accounts.length*10
console.log("initBalance" + initialBalance)


module.exports = function(deployer) {
    deployer.then(function(){
        return deployer.deploy(ProposalRegistry)
    }).then(function(instance){
        return deployer.deploy(UserRegistry, ProposalRegistry.address, accounts[0], initialBalance)
    }).then(function(){
        return ProposalRegistry.deployed()
    }).then(function(instance){
        return instance.init(UserRegistry.address)
    })
};
