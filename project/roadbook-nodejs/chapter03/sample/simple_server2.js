const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
    res.write('<h1>Establish a server with Node.js</h1>');
    res.end('<p>3장 http모듈 공부 중입니다.</p>')
})
.listen(3000, () => {
    console.log('link to server port 3000');
});