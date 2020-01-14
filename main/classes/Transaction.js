"use strict"

function Transaction(
    sender, 
    receiver, 
    amount, 
    minerFee
) {
    return (
        {
            sender,
            receiver,
            amount,
            minerFee,
            timeStamp: new Date().getTime()
        }
    );
}

module.exports = Transaction;