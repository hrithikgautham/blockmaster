"use strict"

const getTransactionsAsObjects = require("./getTransactionsAsObjects");
const Block = require("../../classes/Block");
const getTransactionHash = require("./getTransactionHash");
const getMerkleRoot = require("./getMerkleRoot");
const heapify = require("../../utils/maxHeap");
const fsPromises = require("fs").promises;
const path = require('path');
const { getHash, getBlockHash } = require('block-pow');

const NUMBER_OF_TRANSACTIONS_IN_ONE_BLOCK = 7;
let PREV_HASH = null;

async function createBlock() {
    try {
        const [
            transactions, 
            transactionsMap
        ] = await getTransactionsAsObjects();

        if(transactions.length < NUMBER_OF_TRANSACTIONS_IN_ONE_BLOCK)
            throw new Error("Not enough transaction in mempool");

        const transactionsToBeMerkled = [];
        let i = 0;
        while(i < NUMBER_OF_TRANSACTIONS_IN_ONE_BLOCK) {
            const transactionPath = transactionsMap.get(transactions.shift());
            const transactionHash = getTransactionHash(transactionPath);
            await heapify(transactions, (a, b) => a < b);
            await fsPromises.rename(transactionPath, path.join(__dirname, "..", "transactions", transactionHash));
            transactionsToBeMerkled.push(transactionHash);
            i++;
        }
        /*  
            blockHash,
            prevHash,
            merkleRoot,
            numberOfTransactions,
            difficulty,
            nonce,
            content
         */
        const merkleRoot = await getMerkleRoot([...transactionsToBeMerkled]);
        const blockWithoutNonce = {
            merkleRoot,
            timeStampBeforehashing: new Date().toLocaleString(),
            difficulty: 3,
            prevHash: PREV_HASH
        };
        const blockHash = await getHash(JSON.stringify(blockWithoutNonce), "", "", 'sha256'); // blockHash
        const {
            newString,
            newHash,
            nonce
        } = await getBlockHash(blockHash, 3, ".", "sha256"); // difficulty is static
        const block = Block(
            blockHash,
            PREV_HASH,
            merkleRoot,
            NUMBER_OF_TRANSACTIONS_IN_ONE_BLOCK,
            3,
            nonce,
            transactionsToBeMerkled
        );
        await fsPromises.writeFile(
            path.join(__dirname, "..", "blocks", newHash), 
            JSON.stringify(block)
        );
        PREV_HASH = newHash;
    }
    catch(err) {
        throw err;
    }
}

async function a(){
    await createBlock();
    await createBlock();
    await createBlock();
}

a();