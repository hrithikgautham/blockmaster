const Transaction = require("../../classes/Transaction");
const path = require('path');
const fsPromises = require('fs').promises;
const { getHash } = require('block-pow');
const createFolderIfNotPresent = require("../../utils/createFolderIfNotPresent");

async function storeTransaction(transaction, memFolder) {
    // const hash = await getHash(tran);
    const data = JSON.stringify(transaction);
    try {
        const hash = await getHash(data, "", "", "sha256");
        await fsPromises
                .writeFile(
                    path.join(
                        memFolder,
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
        const memFolder = path.join(__dirname, "..", "..");
        await createFolderIfNotPresent(memFolder, "mempool");
        await storeTransaction(transaction, memFolder);
        await storeTransaction(ownTransaction, memFolder);
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = send;