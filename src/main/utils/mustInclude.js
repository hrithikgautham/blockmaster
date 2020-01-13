"use strict"

const mustInclude = msg => { throw new Error(msg); };

module.exports = { 
    mustInclude
};