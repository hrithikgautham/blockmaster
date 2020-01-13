const path = require('path');

function getTransactionHash(filePath) {
    return path.parse(filePath).name;
}

module.exports = getTransactionHash;