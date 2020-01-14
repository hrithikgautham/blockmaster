"use strict"

const fsPromises = require("fs").promises;
const { join } = require("path");

async function isTransactionPartOfMerkleRoot(merkleRoot, transactionHash) {
    try {
        const files = await fsPromises.readdir(join(__dirname, "..", "..", "blockchain", "merkle"));
        if(files.includes(merkleRoot)){
            const parent = await fsPromises.readFile(join(__dirname, "..", "..", "blockchain", "merkle", merkleRoot), "utf8");
            const [left, right] = parent.split(".");
            if(left === transactionHash || right === transactionHash)
                return true;
            const isLeft = await isTransactionPartOfMerkleRoot(left, transactionHash);
            const isRight = await isTransactionPartOfMerkleRoot(right, transactionHash);
            return isLeft || isRight;
        }
        else 
            return false;
    }
    catch(err) {
        throw err;
    }
}

module.exports = isTransactionPartOfMerkleRoot;