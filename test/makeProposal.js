var ProposalRegistry = artifacts.require("ProposalRegistry.sol");
var UserRegistry = artifacts.require("UserRegistry.sol");
var Proposal = artifacts.require("Proposal.sol");

contract("ProposalRegistry", function(accounts) {
    describe("ProposalRegistry", async () => {
        var propReg;
        var userReg;
        it("should  create a ", async () => {
            propReg = await ProposalRegistry.deployed()
            userReg = await UserRegistry.deployed()
            userRegAddress = await propReg.userRegistry.call()
            assert.equal(userRegAddress, userReg.address, "ProposalRegistry does not")
        })
    })
})
