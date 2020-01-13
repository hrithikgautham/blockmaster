/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/block-pow/hash.js":
/*!****************************************!*\
  !*** ./node_modules/block-pow/hash.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\r\nconst { \r\n    isParameterAbsent, \r\n    checkDiffuculty, \r\n    checkBlockHash,\r\n    isString,\r\n    isNumber\r\n} = __webpack_require__(/*! ./typeCheck/check */ \"./node_modules/block-pow/typeCheck/check.js\");\r\n\r\n//code to generate SHA 256 hash\r\n\r\nconst getHash = (\r\n    block = isParameterAbsent(\"No String provide for hashing\"), \r\n    nonce = \"\", \r\n    delimiter = \"\",\r\n    hashAlgo = 'sha1'\r\n) => (\r\n    new Promise((resolve, reject) => {\r\n        const data = crypto\r\n        .createHash(hashAlgo)\r\n        .update(`${block}${delimiter}${nonce}`)\r\n        .digest('hex');\r\n        resolve(data);\r\n    })\r\n);\r\n\r\nasync function getBlockHashUtil(blockHash, zeros, delimiter, hashAlgo) {\r\n    try {\r\n        await isString(blockHash);\r\n        await isString(delimiter);\r\n        await isNumber(zeros);\r\n        const availableHashingAlgorithms = ['sha1', 'sha256', 'sha512'];\r\n        if(!availableHashingAlgorithms.includes(hashAlgo))\r\n            throw new Error(`${hashAlgo} hash algorithm not provided!`);\r\n        await checkDiffuculty(zeros, hashAlgo);\r\n        await checkBlockHash(blockHash, hashAlgo);\r\n        const startingPattern = \"0\".repeat(zeros);\r\n        if(blockHash.startsWith(startingPattern))\r\n            return [blockHash, ''];// if the hash already meets the requirement then nonce will be \"\" .\r\n        let nonce = 0;// 4 Byte number\r\n        let newBlockHash = \"\";\r\n        const MAX = Math.pow(2, 32);\r\n        while(nonce < MAX) {\r\n            newBlockHash = await getHash(blockHash, nonce.toString(), delimiter, hashAlgo);\r\n            if(newBlockHash.startsWith(startingPattern))\r\n                return [newBlockHash, nonce];\r\n            nonce++;\r\n        }\r\n        throw new Error(\"Couldn't find Hash!\");\r\n    }\r\n    catch(err) {\r\n        console.error(\"Error: error in getBlockHashUtil(); err: \", err);\r\n    }\r\n}\r\n\r\nmodule.exports = { \r\n    getBlockHashUtil,\r\n    getHash,\r\n    isParameterAbsent,\r\n    isString,\r\n    isNumber\r\n};\n\n//# sourceURL=webpack:///./node_modules/block-pow/hash.js?");

/***/ }),

/***/ "./node_modules/block-pow/index.js":
/*!*****************************************!*\
  !*** ./node_modules/block-pow/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nconst { \r\n    getBlockHashUtil, \r\n    getHash,\r\n    isParameterAbsent,\r\n} = __webpack_require__(/*! ./hash */ \"./node_modules/block-pow/hash.js\");\r\n\r\n// const targetString = 'a';\r\n\r\nconst getBlockHash = async (\r\n    blockHash = isParameterAbsent(\"block hash needed!\"), \r\n    difficulty = isParameterAbsent(\"difficulty needed!\"), \r\n    delimiter = \"\",\r\n    hashAlgo = isParameterAbsent('didnt specify hash algorithm')\r\n) => {\r\n    const [hash, nonce] = await getBlockHashUtil(blockHash, difficulty, delimiter, hashAlgo);// default delimiter is \"\".\r\n    return {\r\n        newString: `${blockHash}${delimiter}${nonce}`,\r\n        newHash: hash,\r\n        nonce\r\n    };\r\n};\r\n\r\nmodule.exports = { \r\n    getHash,\r\n    getBlockHash,\r\n};\n\n//# sourceURL=webpack:///./node_modules/block-pow/index.js?");

/***/ }),

/***/ "./node_modules/block-pow/typeCheck/check.js":
/*!***************************************************!*\
  !*** ./node_modules/block-pow/typeCheck/check.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nfunction isParameterAbsent(msg) {\r\n    throw new Error(msg);\r\n}\r\n\r\nfunction checkDiffuculty(zeros, hashAlgo) {\r\n    return new Promise((resolve, reject) => {\r\n        if(\r\n            zeros >= 64 && hashAlgo === 'sha256' || \r\n            zeros >= 128 && hashAlgo === 'sha512' ||\r\n            zeros >= 40 && hashAlgo === 'sha1'\r\n        )// check if zeros doesn't exceed 63 or 127\r\n            reject(new Error(\"difficulty is off the charts!\"));\r\n        if(Math.floor(zeros) !== zeros)// check if it is a integer\r\n            reject(new Error(\"Difficulty must be an 'Integer'.\"));\r\n        resolve();\r\n    });\r\n}\r\n\r\nfunction checkBlockHash(blockHash, hashAlgo) {\r\n    return new Promise((resolve, reject) => {\r\n        if(\r\n            blockHash.length !== 64 && hashAlgo === 'sha256' || \r\n            blockHash.length !== 128 && hashAlgo === 'sha512' ||\r\n            blockHash.length !== 40 && hashAlgo === 'sha1'\r\n        )// check if the hash is 256 bits\r\n            reject(new Error(`Block hash should be a valid hash in HEX format`));\r\n        if(!(/^[0-9a-f]*$/gi).test(blockHash))// check if hash has valid characters\r\n            reject(new Error(\"Block Hash has invalid characters.\"));\r\n        resolve();\r\n    });\r\n}\r\n\r\nfunction isString(inputString) {\r\n    return new Promise((resolve, reject) => {\r\n        if(typeof inputString !== 'string')// check if it is a string\r\n            reject(new Error(\"Not a String!\"));\r\n        resolve();\r\n    });\r\n}\r\n\r\nfunction isNumber(inputNumber) {\r\n    return new Promise((resolve,reject) => {\r\n        if(typeof inputNumber !== 'number')// check if it is a string\r\n            reject(new Error(\"Not a Number!\"));\r\n        resolve();\r\n    });\r\n}\r\n\r\nmodule.exports = { \r\n    isParameterAbsent, \r\n    checkDiffuculty, \r\n    checkBlockHash, \r\n    isString, \r\n    isNumber \r\n};\n\n//# sourceURL=webpack:///./node_modules/block-pow/typeCheck/check.js?");

/***/ }),

/***/ "./src/main/apis/client/index.js":
/*!***************************************!*\
  !*** ./src/main/apis/client/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nconst { send } = __webpack_require__(/*! ./send */ \"./src/main/apis/client/send.js\");\r\n\r\n\r\n\r\nmodule.exports = {\r\n    send\r\n};\n\n//# sourceURL=webpack:///./src/main/apis/client/index.js?");

/***/ }),

/***/ "./src/main/apis/client/send.js":
/*!**************************************!*\
  !*** ./src/main/apis/client/send.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {const Transaction = __webpack_require__(/*! ../../classes/Transaction */ \"./src/main/classes/Transaction.js\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst fsPromises = __webpack_require__(/*! fs */ \"fs\").promises;\r\nconst { getHash } = __webpack_require__(/*! block-pow */ \"./node_modules/block-pow/index.js\");\r\n\r\nasync function storeTransaction(transaction) {\r\n    // const hash = await getHash(tran);\r\n    const data = JSON.stringify(transaction);\r\n    try {\r\n        const hash = await getHash(data, \"\", \"\", \"sha256\");\r\n        await fsPromises\r\n                .writeFile(\r\n                    path.join(\r\n                        __dirname, \r\n                        \"..\", \r\n                        \"..\",\r\n                        \"mempool\", \r\n                        `${hash}` \r\n                    ),\r\n                    data\r\n                );\r\n    }\r\n    catch(err) {\r\n        throw err;\r\n    }\r\n}\r\n\r\nasync function send(sender, receiver, totalAmount, amount, fee) {\r\n    try {\r\n        const remainingAmountOfSender = totalAmount - amount - (2*fee); // HERE, changes needed (tracking transactions)\r\n        if(remainingAmountOfSender < 0)\r\n            return;\r\n        const transaction = Transaction(sender, receiver, amount, fee);\r\n        const ownTransaction = Transaction(sender, sender, remainingAmountOfSender, fee);\r\n        await storeTransaction(transaction);\r\n        await storeTransaction(ownTransaction);\r\n        console.log(\"send got executed\");\r\n    }\r\n    catch(err) {\r\n        console.error(err);\r\n    }\r\n}\r\n\r\nmodule.exports = send;\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/main/apis/client/send.js?");

/***/ }),

/***/ "./src/main/blockchain/utils/getMerkleRoot.js":
/*!****************************************************!*\
  !*** ./src/main/blockchain/utils/getMerkleRoot.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nconst { getHash } = __webpack_require__(/*! block-pow */ \"./node_modules/block-pow/index.js\");\r\n\r\nasync function getMerkleRoot(transactions) {\r\n    try {\r\n        while(transactions.length > 1) {\r\n            const [first, second] = transactions.splice(0, 2)\r\n            const hash = await getHash(`${first}.${second}`, \"\", \"\", 'sha256');\r\n            transactions.push(hash);\r\n        }\r\n        return transactions[0];\r\n    }\r\n    catch(err) {\r\n        throw err;\r\n    }\r\n}\r\n\r\nmodule.exports = getMerkleRoot;\n\n//# sourceURL=webpack:///./src/main/blockchain/utils/getMerkleRoot.js?");

/***/ }),

/***/ "./src/main/blockchain/utils/getTransactionHash.js":
/*!*********************************************************!*\
  !*** ./src/main/blockchain/utils/getTransactionHash.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const path = __webpack_require__(/*! path */ \"path\");\r\n\r\nfunction getTransactionHash(filePath) {\r\n    return path.parse(filePath).name;\r\n}\r\n\r\nmodule.exports = getTransactionHash;\n\n//# sourceURL=webpack:///./src/main/blockchain/utils/getTransactionHash.js?");

/***/ }),

/***/ "./src/main/blockchain/utils/getTransactionsAsObjects.js":
/*!***************************************************************!*\
  !*** ./src/main/blockchain/utils/getTransactionsAsObjects.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(/*! path */ \"path\");\r\nconst fsPromises = __webpack_require__(/*! fs */ \"fs\").promises;\r\n\r\nasync function getTransactionsAsObjects() {\r\n    try {\r\n        const memPath = path.join(__dirname, '..', '..', 'mempool');\r\n        const files = await fsPromises.readdir(memPath);\r\n        const transactions = [];\r\n        const transactionToFile = new Map();\r\n        for(let i = 0 ; i < files.length ; i++) {\r\n            const filePath = path.join(memPath, files[i]);\r\n            const data = await fsPromises.readFile(filePath, \"utf8\");\r\n            transactions[i] = JSON.parse(data);\r\n            transactionToFile.set(transactions[i], filePath);\r\n        }\r\n        return [transactions, transactionToFile];\r\n    }\r\n    catch(err) {\r\n        throw err;\r\n    }\r\n}\r\n\r\nmodule.exports = getTransactionsAsObjects;\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/main/blockchain/utils/getTransactionsAsObjects.js?");

/***/ }),

/***/ "./src/main/blockchain/utils/index.js":
/*!********************************************!*\
  !*** ./src/main/blockchain/utils/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\r\n\r\nconst getTransactionsAsObjects = __webpack_require__(/*! ./getTransactionsAsObjects */ \"./src/main/blockchain/utils/getTransactionsAsObjects.js\");\r\nconst Block = __webpack_require__(/*! ../../classes/Block */ \"./src/main/classes/Block.js\");\r\nconst getTransactionHash = __webpack_require__(/*! ./getTransactionHash */ \"./src/main/blockchain/utils/getTransactionHash.js\");\r\nconst getMerkleRoot = __webpack_require__(/*! ./getMerkleRoot */ \"./src/main/blockchain/utils/getMerkleRoot.js\");\r\nconst heapify = __webpack_require__(/*! ../../utils/maxHeap */ \"./src/main/utils/maxHeap.js\");\r\nconst fsPromises = __webpack_require__(/*! fs */ \"fs\").promises;\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst { \r\n    getHash, \r\n    getBlockHash \r\n} = __webpack_require__(/*! block-pow */ \"./node_modules/block-pow/index.js\");\r\n\r\nconst NUMBER_OF_TRANSACTIONS_IN_ONE_BLOCK = 7;\r\nlet PREV_HASH = null;\r\n\r\nasync function createBlock() {\r\n    try {\r\n        const [\r\n            transactions, \r\n            transactionsMap\r\n        ] = await getTransactionsAsObjects();\r\n\r\n        if(transactions.length < NUMBER_OF_TRANSACTIONS_IN_ONE_BLOCK)\r\n            throw new Error(\"Not enough transaction in mempool\");\r\n\r\n        const transactionsToBeMerkled = [];\r\n        let i = 0;\r\n        while(i < NUMBER_OF_TRANSACTIONS_IN_ONE_BLOCK) {\r\n            const transactionPath = transactionsMap.get(transactions.shift());\r\n            const transactionHash = getTransactionHash(transactionPath);\r\n            await heapify(transactions, (a, b) => a < b);\r\n            await fsPromises.rename(transactionPath, path.join(__dirname, \"..\", \"transactions\", transactionHash));\r\n            transactionsToBeMerkled.push(transactionHash);\r\n            i++;\r\n        }\r\n        /*  \r\n            blockHash,\r\n            prevHash,\r\n            merkleRoot,\r\n            numberOfTransactions,\r\n            difficulty,\r\n            nonce,\r\n            content\r\n         */\r\n        const merkleRoot = await getMerkleRoot([...transactionsToBeMerkled]);\r\n        const blockWithoutNonce = {\r\n            merkleRoot,\r\n            timeStampBeforehashing: new Date().toLocaleString(),\r\n            difficulty: 3,\r\n            prevHash: PREV_HASH\r\n        };\r\n        const blockHash = await getHash(JSON.stringify(blockWithoutNonce), \"\", \"\", 'sha256'); // blockHash\r\n        const {\r\n            newString,\r\n            newHash,\r\n            nonce\r\n        } = await getBlockHash(blockHash, 3, \".\", \"sha256\"); // difficulty is static\r\n        const block = Block(\r\n            blockHash,\r\n            PREV_HASH,\r\n            merkleRoot,\r\n            NUMBER_OF_TRANSACTIONS_IN_ONE_BLOCK,\r\n            3,\r\n            nonce,\r\n            transactionsToBeMerkled\r\n        );\r\n        await fsPromises.writeFile(\r\n            path.join(__dirname, \"..\", \"blocks\", newHash), \r\n            JSON.stringify(block)\r\n        );\r\n        PREV_HASH = newHash;\r\n    }\r\n    catch(err) {\r\n        throw err;\r\n    }\r\n}\r\n\r\nmodule.exports = createBlock;\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/main/blockchain/utils/index.js?");

/***/ }),

/***/ "./src/main/classes/Block.js":
/*!***********************************!*\
  !*** ./src/main/classes/Block.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nfunction BlockHeader(\r\n    blockHash,\r\n    prevHash,\r\n    merkleRoot,\r\n    numberOfTransactions,\r\n    difficulty,\r\n) {\r\n    return (\r\n        {\r\n            blockHash,\r\n            prevHash,\r\n            merkleRoot,\r\n            numberOfTransactions,\r\n            difficulty,\r\n            timeStampAfterHashing: new Date().toLocaleString(),\r\n        }\r\n    );\r\n}\r\n\r\nfunction Block(\r\n    blockHash,\r\n    prevHash,\r\n    merkleRoot,\r\n    numberOfTransactions,\r\n    difficulty,\r\n    nonce,\r\n    content\r\n) {\r\n    return (\r\n        {\r\n            ...BlockHeader(\r\n                blockHash,\r\n                prevHash,\r\n                merkleRoot,\r\n                numberOfTransactions,\r\n                difficulty,\r\n                nonce,\r\n            ),\r\n            content\r\n        }\r\n    );\r\n}\r\n\r\nmodule.exports = Block;\n\n//# sourceURL=webpack:///./src/main/classes/Block.js?");

/***/ }),

/***/ "./src/main/classes/Transaction.js":
/*!*****************************************!*\
  !*** ./src/main/classes/Transaction.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nfunction Transaction(\r\n    sender, \r\n    receiver, \r\n    amount, \r\n    minerFee\r\n) {\r\n    return (\r\n        {\r\n            sender,\r\n            receiver,\r\n            amount,\r\n            minerFee,\r\n            timeStamp: new Date().toDateString()\r\n        }\r\n    );\r\n}\r\n\r\nmodule.exports = Transaction;\n\n//# sourceURL=webpack:///./src/main/classes/Transaction.js?");

/***/ }),

/***/ "./src/main/index.js":
/*!***************************!*\
  !*** ./src/main/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nconst { send } = __webpack_require__(/*! ./apis/client */ \"./src/main/apis/client/index.js\");\r\nconst createBlock = __webpack_require__(/*! ./blockchain/utils */ \"./src/main/blockchain/utils/index.js\");\r\n\r\nmodule.exports = { \r\n    send,\r\n    createBlock\r\n};\n\n//# sourceURL=webpack:///./src/main/index.js?");

/***/ }),

/***/ "./src/main/utils/maxHeap.js":
/*!***********************************!*\
  !*** ./src/main/utils/maxHeap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nasync function sifting(transactions, n, init, comparisonFunction) {\r\n    // console.log(comparisonFunction(transactions[0], transactions[1]));\r\n    // return;\r\n    try {\r\n        let max = init;\r\n        const left = 2 * init + 1;\r\n        const right = left + 1;\r\n        if(left < n && comparisonFunction(transactions[max], transactions[left]))\r\n            max = left;\r\n        if(right < n && comparisonFunction(transactions[max], transactions[right]))\r\n            max = right;\r\n        if(max != init) {\r\n            // console.log(\"max: \", transactions[max], \"init: \", transactions[init]);\r\n            [transactions[max], transactions[init]] = [transactions[init], transactions[max]]; // swap\r\n            await sifting(transactions, n, max, comparisonFunction);\r\n        }\r\n    }\r\n    catch(err) {\r\n        throw err;\r\n    }\r\n}\r\n\r\nasync function heapify(transactions, comparisonFunction) {\r\n    // console.log(comparisonFunction(transactions[0], transactions[1]));\r\n    // return;\r\n    try {\r\n        const n = transactions.length;\r\n        for(let i = Math.floor((n / 2) - 1) ; i >= 0 ; i--)\r\n            await sifting(transactions, n, i, comparisonFunction);\r\n    }\r\n    catch(err) {\r\n        throw err;\r\n    }\r\n}\r\n\r\n// getMax([1,4,5,1,4,2,3,54,34,12,0,22]).then(console.log).catch(console.error);\r\n\r\nmodule.exports = heapify;\n\n//# sourceURL=webpack:///./src/main/utils/maxHeap.js?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });