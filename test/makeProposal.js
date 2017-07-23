var ProposalRegistry = artifacts.require("ProposalRegistry.sol");
var UserRegistry = artifacts.require("UserRegistry.sol");
var Proposal = artifacts.require("Proposal.sol");

contract("ProposalRegistry", function(accounts) {
    describe("ProposalRegistry", async () => {
        var propReg;
        var userReg;
        var proposal;
        it("should  create a ", async () => {
            propReg = await ProposalRegistry.deployed()
            userReg = await UserRegistry.deployed()
            userRegAddress = await propReg.userRegistry.call()
            assert.equal(userRegAddress, userReg.address, "ProposalRegistry does not")
        })
        it("should create a Proposal", async () => {
            receiptFromMakeProposal = await propReg.makeProposal(10,10)
            proposalAddress = getProposalAddress(receiptFromMakeProposal)
            proposal = await Proposal.at(proposalAddress)
            // console.log(proposalAddress)
            exists = await propReg.proposalExists.call(proposalAddress)
            assert.equal(exists, true, "Registry does not know about the created Proposal")
        })
    })
})

function getProposalAddress(receiptFromMakeProposal){
    tmp = receiptFromMakeProposal.logs[0].args.proposal
    // console.log(tmp)
    return tmp
}
