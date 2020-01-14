"use strict"

const { join } = require('path');
const fsPromises = require('fs').promises;

async function createFolderIfNotPresent(path, folderName) {
    const isFolderPresent = (await fsPromises.readdir(path)).includes(folderName);
    if(!isFolderPresent)
        await fsPromises.mkdir(join(path, folderName));
}

module.exports = createFolderIfNotPresent;