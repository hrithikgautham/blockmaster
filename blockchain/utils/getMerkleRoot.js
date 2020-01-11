// const transactions = require('../transactions');
const path = require('path');
const fs = require('fs');
const { getHash } = require('block-pow');
const { gittify } = require('gitmon');
const fsPromises = fs.promises;

// transactions.map(transactions[i] => [transactions[i], H256(JSON.stringify(transactions[i]))]);
// const noOfTransactions = transactions.length;
// first create all the file pertaining to each transactions and sstore it in ./transactionHistory directory
// function init(transactions, hashAlg) {
//     try {
//         const hashes = [];
//         for(let i = 0 ; i < transactions.length ; i++) {
//             await getHash(transactions[i]);
//         }
//         return hashes;
//     }
//     catch(err) {
//         console.error("getMerkle Error: ", err);
//     }
// }

let numberOfTransactionsFromMempool = 2;

async function generateMerkleRoot(hashes, HALG) {
    while(hashes.length > 1){
        const appendedHashes = [`${hashes.shift()}.${hashes.shift()}`];
        await gittify(
            path.join(__dirname, 'transactions'),
            {
                srcFolder: [ appendedHashes ],
                ext: '',
                numOfChars: 2,
                HALG
            } 
        );
        hashes.push(pushBackHash[0]);
    }
    return hashes.pop();
}

async function getMerkleRoot(HALG) {
    try {
        const hashes = await init(transactions, HALG);
        await gittify(
            path.join(__dirname, 'transactions'),
            {
                srcFolder: hashes,
                ext: '',
                numOfChars: 2,
                HALG
            }
        );
        const merkleRoot = await generateMerkleRoot(hashes, HALG);
        return merkleRoot;
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = { getMerkleRoot, init, noOfTransactions };