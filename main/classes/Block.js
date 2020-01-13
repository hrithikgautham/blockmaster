"use strict"

function BlockHeader(
    blockHash,
    prevHash,
    merkleRoot,
    numberOfTransactions,
    difficulty,
) {
    return (
        {
            blockHash,
            prevHash,
            merkleRoot,
            numberOfTransactions,
            difficulty,
            timeStampAfterHashing: new Date().toLocaleString(),
        }
    );
}

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
            ...BlockHeader(
                blockHash,
                prevHash,
                merkleRoot,
                numberOfTransactions,
                difficulty,
                nonce,
            ),
            content
        }
    );
}

module.exports = Block;