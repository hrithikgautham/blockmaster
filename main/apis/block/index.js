/**
 * 1) get transaction object from transaction hash.
 * 2) given a transaction hash, find which block it belongs.
 * 3) get all the transactions from a block
 * 4) get previousblockhash of current block
 * 5) given a transaction, find if it is part fo blockchain
 */

 const isTransactionPartOfMerkleRoot = require("./isTransactionPartOfMerkleRoot");

isTransactionPartOfMerkleRoot(
    "d2b9dac043c18a699fa1dce72f631f43ac822df2be95578494207bb6f88f475e",
    "35981dbbab4647f6ae0e870f95429e2cf0f6096bbe22af7668b548b0c928c1fb"
)
.then(console.log)
.catch(console.error);