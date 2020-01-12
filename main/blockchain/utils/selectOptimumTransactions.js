const path = require('path');
const fsPromises = require('fs').promises;
const heapify = require('../../utils/maxHeap');

async function getOptimumTransactions() {
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
        await heapify(transactions, (a, b) => a.minerFee < b.minerFee);
        return [transactions, transactionToFile];
    }
    catch(err) {
        throw err;
    }
}

module.exports = getOptimumTransactions;