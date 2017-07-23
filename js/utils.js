exports.getProposalAddress = function(receiptFromMakeProposal){
    tmp = receiptFromMakeProposal.logs[0].args.proposal
    // console.log(tmp)
    return tmp
}


