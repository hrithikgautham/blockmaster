const path = require('path');
const fsPromises = require('fs').promises;

async function getTransactionsAsObjects() {
    try {
        const memPath = path.join(__dirname, '..', '..', 'mempool');
        const files = await fsPromises.readdir(memPath);
        const transactions = [];
        const transactionToFile = new Map();
        for(let i = 0 ; i < files.length ; i++) {
            const filePath = path.join(memPath, files[i]);
            const data = await fsPromises.readFile(filePath, "utf8");
            transactions[i] = JSON.parse(data);
            transactionToFile.set(transactions[i], filePath);
        }
        return [transactions, transactionToFile];
    }
    catch(err) {
        throw err;
    }
}

module.exports = getTransactionsAsObjects;