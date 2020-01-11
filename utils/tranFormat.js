
function formatTransaction(
    sender, 
    receiver,
    amountWillingToSend,
    minerFee
) {
    return {
        sender,
        receiver,
        timeStamp: new Date().toLocaleString(),
        amount: amountWillingToSend,
        fee: minerFee
    };
}

module.exports = formatTransaction;