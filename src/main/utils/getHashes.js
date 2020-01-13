const transactions = require('../src/transactions');
const { getHash } = require('block-pow');

function getHashesOfAllTransactions(transactions) {
    return new Promise((resolve, reject) => {
        const hashes = [];
        // const currentPath = code === 1 ? "transactionHistory" : "blocks"; 
        for(let i = 0 ; i < transactions.length ; i++){
            const content = JSON.stringify(transactions[i]);
            // const compressedContent
            const fileHash = await getHash(JSON.stringify(transactions[i]), "", "", 'sha256');
            hashes.push(fileHash);
            const transactionHistoryDirectories = await fsPromises.readdir(path.join(__dirname, "transactionHistory"));
            const matches = transactionHistoryDirectories.filter(transactionHistoryDirectory => transactionHistoryDirectory.startsWith(fileHash.slice(0,2))).length >= 1;
            if(!matches)
                await fsPromises.mkdir(path.join(__dirname, "transactionHistory", fileHash.slice(0,2)));
            await fsPromises.writeFile(path.join(__dirname, "transactionHistory", fileHash.slice(0,2), `${fileHash.slice(2, fileHash.length)}`), content);
            resolve(hashes);
        }
    });
}