"use strict"

const fsPromises = require("fs").promises;
const { join } = require('path');
const isValid = require("./isValid");

async function getMerkleRootOfBlock(blockHash) {
    try {
        const blockExist = await isValid("blocks", blockHash);
        if(blockExist) {
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
            return JSON.parse(block).merkleRoot;
        }
        else
            return "";
    }
    catch(err){
        throw err;
    }
}

module.exports = getMerkleRootOfBlock;