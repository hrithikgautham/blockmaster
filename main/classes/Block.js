"use strict"

function BlockHeader(
    blockHash,
    prevHash,
    merkleRoot,
    numberOfTransactions,
    nonce
) {
    return (
        {
            blockHash,
            prevHash,
            merkleRoot,
            numberOfTransactions,
            nonce
        }
    );
}

function Block(
    blockHash,
    prevHash,
    merkleRoot,
    numberOfTransactions,
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
                nonce      
            ),
            content,
        }
    );
}

module.exports = {
    BlockHeader,
    Block,
};