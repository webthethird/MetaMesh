var ProposalRegistry = artifacts.require("ProposalRegistry.sol");
var UserRegistry = artifacts.require("UserRegistry.sol");

contract("ProposalRegistry", function(accounts) {
    describe("ProposalRegistry", async () => {
        var propReg;
        var userReg;
        it("should know about the UserRegistry", async () => {
            propReg = await ProposalRegistry.deployed()
            userReg = await UserRegistry.deployed()
            userRegAddress = await propReg.userRegistry.call()
            assert.equal(userRegAddress, userReg.address, "ProposalRegistry does not")
        })
    })
})

contract("UserRegistry", function(accounts) {
    describe("should manage balances, such that", async () => {
        it("User 0 should have a balance of 10", async () => {
            userRegistryInstance = await UserRegistry.deployed()
            balance = await userRegistryInstance.balances.call(accounts[0])
            assert.equal(balance.toNumber(),10, "User0 does not have 10 MeshTokens")
            balance = await userRegistryInstance.balances.call(accounts[4])
            assert.equal(balance.toNumber(),10, "User4 does not have 10 MeshTokens")
        });

        it("Should modify balances correctly", function(){
            var account1InitialBalance;
            var account2InitialBalance;
            var amount = 5;
            return UserRegistry.deployed().then(function(instance){
                UserRegistryInstance = instance
                return UserRegistryInstance.balances.call(accounts[0])
            }).then(function(balance){
                account1InitialBalance = balance
                return UserRegistryInstance.balances.call(accounts[1])
            }).then(function(balance) {
                account2InitialBalance = balance
                return UserRegistryInstance.transfer(accounts[1], amount, {from: accounts[0]})
            }).then(function() {
                return UserRegistryInstance.balances.call(accounts[0])
            }).then(function(balance) {
                assert.equal(account1InitialBalance - balance.toNumber(), amount, "User1 didn't lose tokens")
                return UserRegistryInstance.balances.call(accounts[1])
            }).then(function(balance) {
                assert.equal(balance.toNumber() - account2InitialBalance, amount, "User2 didn't gain tokens")
            })
        })
    })
})

