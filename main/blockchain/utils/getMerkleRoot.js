"use strict"

const { getHash } = require('block-pow');
const fsPromises = require("fs").promises;
const { join } = require("path");

async function getMerkleRoot(merklePath, transactions) {
    try {
        while(transactions.length > 1) {
            const [first, second] = transactions.splice(0, 2)
            const content = `${first}.${second}`;
            const hash = await getHash(content, "", "", 'sha256');
            await fsPromises.writeFile(join(merklePath, hash), content);
            transactions.push(hash);
        }
        return transactions[0];
    }
    catch(err) {
        throw err;
    }
}

module.exports = getMerkleRoot;