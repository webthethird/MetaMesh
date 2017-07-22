var ProposalRegistry = artifacts.require("ProposalRegistry.sol");
var UserRegistry = artifacts.require("UserRegistry.sol");

contract("ProposalRegistry", function(accounts) {
    describe("ProposalRegistry", aync () => {
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
