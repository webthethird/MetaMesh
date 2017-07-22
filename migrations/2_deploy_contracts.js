var ProposalRegistry = artifacts.require("./ProposalRegistry.sol");
var UserRegistry = artifacts.require("./UserRegistry.sol");
var Concept = artifacts.require("./Proposal.sol");

module.exports = function(deployer) {
    deployer.then(function(){
        return deployer.deploy(ProposalRegistry)
    }).then(function(instance){
        return deployer.deploy(UserRegistry, ProposalRegistry.address)
    }).then(function(){
        return ProposalRegistry.deployed()
    }).then(function(instance){
        return instance.init(UserRegistry.address)
    })
};
