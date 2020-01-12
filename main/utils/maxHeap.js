"use strict"

async function siftDown(transactions, n, init) {
    let max = init;
    const left = 2 * init + 1;
    const right = left + 1;
    if(left < n && transactions[max] < transactions[left])
        max = left;
    if(right < n && transactions[max] < transactions[right])
        max = right;
    if(max != init) {
        // console.log("max: ", transactions[max], "init: ", transactions[init]);
        [transactions[max], transactions[init]] = [transactions[init], transactions[max]];
        await siftDown(transactions, n, max);
    }
}

async function maxHeapify(transactions) {
    const n = transactions.length;
    for(let i = Math.floor((n / 2) - 1) ; i >= 0 ; i--)
        await siftDown(transactions, n, i);
}

// getMax([1,4,5,1,4,2,3,54,34,12,0,22]).then(console.log).catch(console.error);

module.exports = maxHeapify;