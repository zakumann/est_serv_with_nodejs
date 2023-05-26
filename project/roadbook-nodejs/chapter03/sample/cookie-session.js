const http = require('http');

const session = {};
const sessKey = new Date();
session[sessKey] = { name: 'roadbook' };

http.createServer((req, res) => {
    res.writeHead(200, { 'Set-cookie': `session=${sessKey}` });
    res.end('Session-Cookie --> Header');
})
.listen(3000, () => {
    console.log('Connect to the server port 3000...');
})