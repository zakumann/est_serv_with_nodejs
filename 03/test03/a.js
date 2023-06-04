console.log('a.js incoming!...');

const b = require('./b');

module.exports = {
    call : () => {
        console.log('a.js to b :', b);
    }
};