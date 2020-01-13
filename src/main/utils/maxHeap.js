"use strict"

async function sifting(transactions, n, init, comparisonFunction) {
    // console.log(comparisonFunction(transactions[0], transactions[1]));
    // return;
    try {
        let max = init;
        const left = 2 * init + 1;
        const right = left + 1;
        if(left < n && comparisonFunction(transactions[max], transactions[left]))
            max = left;
        if(right < n && comparisonFunction(transactions[max], transactions[right]))
            max = right;
        if(max != init) {
            // console.log("max: ", transactions[max], "init: ", transactions[init]);
            [transactions[max], transactions[init]] = [transactions[init], transactions[max]]; // swap
            await sifting(transactions, n, max, comparisonFunction);
        }
    }
    catch(err) {
        throw err;
    }
}

async function heapify(transactions, comparisonFunction) {
    // console.log(comparisonFunction(transactions[0], transactions[1]));
    // return;
    try {
        const n = transactions.length;
        for(let i = Math.floor((n / 2) - 1) ; i >= 0 ; i--)
            await sifting(transactions, n, i, comparisonFunction);
    }
    catch(err) {
        throw err;
    }
}

// getMax([1,4,5,1,4,2,3,54,34,12,0,22]).then(console.log).catch(console.error);

module.exports = heapify;