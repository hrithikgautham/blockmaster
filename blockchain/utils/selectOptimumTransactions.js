const path = require('path');
const fsPromises = require('fs').promises;

async function getOptimumTransactions() {
    const memPath = path.join(__dirname, '..', 'mempool');
    const files = await fsPromises.readdir(memPath);
    for(let i = 0 ; i < files.length ; i++) {
        
    }
}