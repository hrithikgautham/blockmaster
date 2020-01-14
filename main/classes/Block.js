"use strict"

function Block(
    blockHash,
    prevHash,
    merkleRoot,
    numberOfTransactions,
    difficulty,
    nonce,
    content
) {
    return (
        {
            blockHash,
            prevHash,
            merkleRoot,
            numberOfTransactions,
            difficulty,
            timeStampAfterHashing: new Date().toLocaleString(),
            nonce,
            content
        }
    );
}

module.exports = Block;