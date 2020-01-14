"use strict"

const fsPromises = require("fs").promises;
const { join } = require('path');

async function clear(path) {
    const files = await fsPromises.readdir(path);
    for(let i = 0 ; i < files.length ; i++) {
        const fileOfFolderPath = join(path, files[i]);
        const stat = await fsPromises.stat(fileOfFolderPath);
        if(stat.isDirectory())
            await clear(fileOfFolderPath);
        else
            await fsPromises.unlink(fileOfFolderPath);
    }
    await fsPromises.rmdir(path);
}

module.exports = clear;