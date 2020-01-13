const Transaction = require("../../classes/Transaction");
const path = require('path');
const fsPromises = require('fs').promises;
const { getHash } = require('block-pow');

async function storeTransaction(transaction) {
    // const hash = await getHash(tran);
    const data = JSON.stringify(transaction);
    try {
        const hash = await getHash(data, "", "", "sha256");
        await fsPromises
                .writeFile(
                    path.join(
                        __dirname, 
                        "..", 
                        "..",
                        "mempool", 
                        `${hash}` 
                    ),
                    data
                );
    }
    catch(err) {
        throw err;
    }
}

async function send(sender, receiver, totalAmount, amount, fee) {
    try {
        const remainingAmountOfSender = totalAmount - amount - (2*fee); // HERE, changes needed (tracking transactions)
        if(remainingAmountOfSender < 0)
            return;
        const transaction = Transaction(sender, receiver, amount, fee);
        const ownTransaction = Transaction(sender, sender, remainingAmountOfSender, fee);
        await storeTransaction(transaction);
        await storeTransaction(ownTransaction);
        console.log("send got executed");
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = send;