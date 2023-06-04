console.log('b.js incoming!...');

const a = require('./a');

module.exports = {
    call : () => {
        console.log('b.js to a :', a);
    }
};