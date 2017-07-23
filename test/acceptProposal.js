var ProposalRegistry = artifacts.require("ProposalRegistry.sol");
var UserRegistry = artifacts.require("UserRegistry.sol");
var Proposal = artifacts.require("Proposal.sol");

accounts = web3.eth.accounts
utils = require("../js/utils.js")

cost = 100000000
votingTime = 1000
roles = [12,13,14] // 1 buyer, 1 installer, 1 learner

donors = accounts.slice(0,2);
donations = [cost/2+ 1000, cost/2 + 1000] //extra tfor gascost
workers = accounts.slice(2,6);
volunteers = accounts.slice(6,9);

contract("Accepting ", function(accounts) {
    describe("a Proposal", async () => {
        var propReg;
        var proposal;
        it("is created.", async () => {
            propReg = await ProposalRegistry.deployed()
            receiptFromMakeProposal = await propReg.makeProposal(cost, votingTime,roles)
            proposalAddress = utils.getProposalAddress(receiptFromMakeProposal)
            proposal = await Proposal.at(proposalAddress)
            // console.log(proposalAddress)
            exists = await propReg.proposalExists.call(proposalAddress)
            assert.equal(exists, true, "Registry does not know about the created Proposal")

        })
        it("Donors endorse the proposal by paying ether", async () => {
            for (d=0;d<donors.length;d++){
                await proposal.fund({from:donors[d], value:donations[d]})
            }
            totalFunds = await proposal.getTotalFunds.call()
            assert.isAbove(totalFunds.toNumber(), cost, "funding did not reach proposal")
            state = await proposal.proposalState.call()
            assert.equal(state.toNumber(),0,"proposal is not in state 'Proposed'" )

        })

        it("workers endorse the proposal by commiting their MeshTokens", async () => {
            for (d=0;d<workers.length;d++){
                await proposal.endorse(9, {from:workers[d]})
            }
            totalVotes = await proposal.endorsements.call()
            totalVotesNeeded = await proposal.totalVotesNeeded.call()
            assert.isAbove(totalVotes.toNumber(),totalVotesNeeded.toNumber(),  "funding did not reach proposal")
            state = await proposal.proposalState.call()
            assert.equal(state.toNumber(),0,"proposal is not in state 'Proposed'" )
        })

        it("volunteers endorse the proposal by commiting their time and staking tokens", async () => {
            userReg = await UserRegistry.deployed()
            balanceBefore = await userReg.balances.call(volunteers[0])

            for (d=0;d<volunteers.length;d++){
                await proposal.commit(roles[d], {from:volunteers[d]})
            }

            balanceAfter = await userReg.balances.call(volunteers[0])
            assert.isAbove(balanceBefore.toNumber(), balanceAfter.toNumber(), "voluntter did not need to stake")
        })

        it("and the Proposal is accepted", async () => {
            state = await proposal.proposalState.call()
            assert.equal(state.toNumber(),1,"proposal is not in state 'Accepted'" )
        })
    })
})

 
