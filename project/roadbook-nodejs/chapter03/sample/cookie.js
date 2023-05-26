const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Set-cookie': 'name=roadbook' });
    console.log(req.headers.cookie);
    res.end('Cookie --> Header');
})
.listen(3000, () => {
    console.log('Connect to the server port 3000...');
});