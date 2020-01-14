"use strict"

const isValid = require("./isValid");
const fsPromises = require("fs").promises;
const { join } = require("path");

async function isTransactionPresentInBlock(blockHash, transactionHash) {
    try {
        const validBlock = await isValid("blocks", blockHash);
        if(validBlock) {
            const block = await fsPromises
                    .readFile(
                        join(
                            __dirname, 
                            "..", 
                            "..", 
                            "blockchain", 
                            "blocks", 
                            blockHash
                        ),
                        "utf8"
                    );
            return JSON.parse(block).content.includes(transactionHash);  
        }
        else
            return false;
    }
    catch(err) {
        console.error(err);
    }
} 

isTransactionPresentInBlock(
    "000cb5d1a86e9fe301fd9a2be6d7a65b3fa7471d2cf13b522b276c87f00fb393",
    "a0f7802cb26324564b25559891a6250fc4c662d2f0cb8f76320449e2544658a6"
).then(console.log);