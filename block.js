const createBlock = require("./main/blockchain/utils");


async function a(){
    await createBlock();
    await createBlock();
    await createBlock();
}


a();