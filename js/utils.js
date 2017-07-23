exports.getProposalAddress = function(receiptFromMakeProposal){
    tmp = receiptFromMakeProposal.logs[0].args.proposal
    // console.log(tmp)
    return tmp
}


exports.evmIncreaseTime = function(seconds) {
    return new Promise(function (resolve, reject) {
        return web3.currentProvider.sendAsync({
            jsonrpc: "2.0",
            method: "evm_increaseTime",
            params: [seconds],
            id: new Date().getTime()
        }, function (error, result) {
            return error ? reject(error) : resolve(result.result);
        })
    })
}

