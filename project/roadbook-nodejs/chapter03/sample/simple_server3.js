const http = require('http');

const server =http.createServer ((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text.html; charset=utf-8' });
    res.write('<h1>Establish a server with Node.js</h1>')
    res.end('<p>3장 http 모듈 공부 중입니다.</p>')
})
.listen(3000);

/* Listening Event Listener */
server.on('listening', () => {
    console.log("linking to server port 3000...");
});

/* Error Event Listener */
server.on('error', () => {
    console.error(error);
});