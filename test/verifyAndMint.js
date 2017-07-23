var ProposalRegistry = artifacts.require("ProposalRegistry.sol");
var ArbiterOracle = artifacts.require("./ArbiterOracle.sol");
var UserRegistry = artifacts.require("UserRegistry.sol");
var Proposal = artifacts.require("Proposal.sol");
var ArbiterOracle = artifacts.require("ArbiterOracle.sol");

accounts = web3.eth.accounts
utils = require("../js/utils.js")

cost = 100000000
votingTime = 1000
roles = [12,13,14] // 1 buyer, 1 installer, 1 learner

arbiter = accounts[0];
donors = accounts.slice(1,2);
donations = [cost +  1000] //extra tfor gascost
workers = accounts.slice(2,6);
volunteers = accounts.slice(6,9);

contract("Finishing: ", function(accounts) {
    describe("A Proposal is", async () => {
        var propReg;
        var proposal;
        var oracle;
        it("created.", async () => {
            propReg = await ProposalRegistry.deployed()
            oracle = await ArbiterOracle.deployed()
            receiptFromMakeProposal = await propReg.makeProposal(cost, votingTime,roles,oracle.address)
            proposalAddress = utils.getProposalAddress(receiptFromMakeProposal)
            proposal = await Proposal.at(proposalAddress)
            // console.log(proposalAddress)
            exists = await propReg.proposalExists.call(proposalAddress)
            assert.equal(exists, true, "Registry does not know about the created Proposal")

        })

        it("accepted by workers, donors and volunteers", async () => {
            utils.evmIncreaseTime(votingTime /2)
            for (d=0;d<donors.length;d++){
                await proposal.fund({from:donors[d], value:donations[d]})
            }
            for (d=0;d<workers.length;d++){
                await proposal.endorse(9, {from:workers[d]})
            }
            for (d=0;d<volunteers.length;d++){
                await proposal.commit(roles[d], {from:volunteers[d]})
            }
            state = await proposal.proposalState.call()
            assert.equal(state.toNumber(),1,"proposal is not in state 'Accepted'" )
        })
        it("arbiters vote by submitting to the oracle", async ()=> {
            before = await oracle.completed.call()
            await oracle.sign(true, {from: arbiter})
            result = await oracle.result.call();
            after = await oracle.completed.call()
            console.log(after.toNumber())
            assert.equal(result.toNumber(), 1, "arbiter could not log in his score" )
            assert.isAbove(after.toNumber(), before.toNumber(), "arbiter could not log in his score" )


        })
    })
})
 
