var UserRegistry = artifacts.require("./UserRegistry.sol");

//Bills uport address
//demoAddress = xxxx

module.exports = function(deployer) {
    accounts = web3.eth.accounts
    var UserRegistryInstance
    deployer.then(function(){
        return UserRegistry.deployed()
    }).then(function(instance){
        for(i=1; i < accounts.length; i++) {
            instance.transfer(accounts[i], 10, {from: accounts[0]})
        }
        // instance.transfer(demoAddress, 1, {from: accounts[0]})
    })
}
