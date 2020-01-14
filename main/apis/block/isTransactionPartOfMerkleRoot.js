"use strict"

const fsPromises = require("fs").promises;
const { join } = require("path");

async function isTransactionPartOfMerkleRoot(merkleRoot, transactionHash) {
    try {
        await getBlockFromMerkleRoot();
    }
    catch(err) {
        throw err;
    }
}

module.exports = isTransactionPartOfMerkleRoot;