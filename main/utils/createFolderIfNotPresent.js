"use strict"

const { join } = require('path');
const fsPromises = require('fs').promises;

async function createFolderIfNotPresent(path, folderName) {
    try {
        const folderArray = await fsPromises.readdir(path);
        if(!folderArray.includes(folderName))
            await fsPromises.mkdir(join(path, folderName));
    }
    catch(err) {
        console.error("Error in createFolderIfNotPresent");
    }
}

module.exports = createFolderIfNotPresent;