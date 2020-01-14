"use strict"

const fsPromises = require("fs").promises;
const { join } = require("path");

async function isValid(folderName, hash) {
    try {
        const transactions = await fsPromises
                                    .readdir(
                                        join(
                                            __dirname, 
                                            "..", 
                                            "..", 
                                            "blockchain", 
                                            folderName
                                        )
                                    );
        return transactions.includes(hash);
    }
    catch(err){
        console.error(err);
    }
}

module.exports = isValid