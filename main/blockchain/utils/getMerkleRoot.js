"use strict"
const { getHash } = require('block-pow');

async function getMerkleRoot(transactions) {
    try {
        while(transactions.length > 1) {
            const [first, second] = transactions.splice(0, 2)
            const hash = await getHash(`${first}.${second}`, "", "", 'sha256');
            transactions.push(hash);
        }
        return transactions[0];
    }
    catch(err) {
        throw err;
    }
}

module.exports = getMerkleRoot;