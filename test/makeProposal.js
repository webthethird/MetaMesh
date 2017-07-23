var ProposalRegistry = artifacts.require("ProposalRegistry.sol");
var UserRegistry = artifacts.require("UserRegistry.sol");
var Proposal = artifacts.require("Proposal.sol");

utils = require("../js/utils.js")

contract("ProposalRegistry", function(accounts) {
    describe("ProposalRegistry", async () => {
        var propReg;
        var proposal;
        it("should create a Proposal", async () => {
            propReg = await ProposalRegistry.deployed()
            receiptFromMakeProposal = await propReg.makeProposal(10,10)
            proposalAddress = utils.getProposalAddress(receiptFromMakeProposal)
            proposal = await Proposal.at(proposalAddress)
            // console.log(proposalAddress)
            exists = await propReg.proposalExists.call(proposalAddress)
            assert.equal(exists, true, "Registry does not know about the created Proposal")
        })
    })
})

// function getProposalAddress(receiptFromMakeProposal){
//     tmp = receiptFromMakeProposal.logs[0].args.proposal
//     // console.log(tmp)
//     return tmp
// }
