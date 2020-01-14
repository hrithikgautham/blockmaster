"use strict"

const fsPromises = require("fs").promises;
const { join } = require("path");

async function isTransactionPresentInBlockChain(transactionsHash) {
    // get the has of genesis block
    const genesisHash = await fsPromises.readFile(join(__dirname, "..", "..", "blockchain", "blocks", "genesisBlock"), "utf8");
    // 
}