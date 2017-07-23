var ProposalRegistry = artifacts.require("ProposalRegistry.sol");
var UserRegistry = artifacts.require("UserRegistry.sol");
var Proposal = artifacts.require("Proposal.sol");

utils = require("../js/utils.js")

cost = 1000000
votingTime = 1000
roles = [12,13,14] // 1 buyer, 1 installer, 1 learner

contract("ProposalRegistry", function(accounts) {
    describe("ProposalRegistry", async () => {
        var propReg;
        var proposal;
        it("should create a Proposal", async () => {
            propReg = await ProposalRegistry.deployed()
            receiptFromMakeProposal = await propReg.makeProposal(cost, votingTime,roles)
            proposalAddress = utils.getProposalAddress(receiptFromMakeProposal)
            proposal = await Proposal.at(proposalAddress)
            // console.log(proposalAddress)
            exists = await propReg.proposalExists.call(proposalAddress)
            assert.equal(exists, true, "Registry does not know about the created Proposal")
        })
        it ("such that the number of votes is set to 1/3 of the existing tokens", async () => {
            votesNeeded = await proposal.totalVotesNeeded.call()
            assert.isAbove(votesNeeded.toNumber(), 30, "votes Needed wrongly set")
        })
        it ("and the price set to 1000000 wei", async () => {
            price = await proposal.cost.call()
            assert.equal(price.toNumber(), 1000000, "price wrongly set")
        })
    })
})

// function getProposalAddress(receiptFromMakeProposal){
//     tmp = receiptFromMakeProposal.logs[0].args.proposal
//     // console.log(tmp)
//     return tmp
// }
