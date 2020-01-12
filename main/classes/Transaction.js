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
            timeStamp: new Date().toDateString()
        }
    );
}

module.exports = Transaction;