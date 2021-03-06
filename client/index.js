const transactionFormat = require("../utils/tranFormat");
const path = require('path');
const fsPromises = require('fs').promises;
const { getHash } = require('block-pow');
let COUNT = 0;

async function storeTransaction(transaction) {
    // const hash = await getHash(tran);
    const data = JSON.stringify(transaction);
    const hash = await getHash(data, "", "", "sha256");
    await fsPromises
            .writeFile(
                path.join(
                    __dirname, 
                    "..", 
                    "mempool", 
                    `${hash}` 
                ),
                JSON.stringify(data)
            );
    COUNT++;
}

async function send(sender, receiver, totalAmount, amount, fee) {
    try {
        const remainingAmountOfSender = totalAmount - amount - (2*fee); // HERE, changes needed (tracking transactions)
        if(remainingAmountOfSender < 0)
            throw new Error('cannot send!');
        const transaction = transactionFormat(sender, receiver, amount, fee);
        const ownTransaction = transactionFormat(sender, sender, remainingAmountOfSender, fee);
        await storeTransaction(transaction);
        await storeTransaction(ownTransaction);
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = send;