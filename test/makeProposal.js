var ProposalRegistry = artifacts.require("ProposalRegistry.sol");
var UserRegistry = artifacts.require("UserRegistry.sol");
var Proposal = artifacts.require("Proposal.sol");

contract("ProposalRegistry", function(accounts) {
    describe("ProposalRegistry", async () => {
        var propReg;
        var userReg;
        var proposal;
        it("should  create a proposal", async () => {
            propReg = await ProposalRegistry.deployed()
            proposalReceipt = await propReg.makeProposal(100, 100, {from:accounts[0]})
            console.log(proposalReceipt)
            proposalAddress = getProposalAddress(proposalReceipt)
            proposal = await Proposal.at(proposalAddress)
            proposalExists = await propReg.proposalExists.call(proposalAddress)
            assert.equal(proposalExists, true, "proposal was not created")


        })
    })
})
