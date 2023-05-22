const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const f =await fs.readFile('./fs_test.html');
        res.writeHead(200, { 'Content-Type': 'text.html; charset=utf-8' });
        // 200 -> success
        res.end(f);
    }catch (err) {
        console.error(err); //if failed, appear this.
        res.writeHead(500, { 'Content-Type': 'text.html; charset= utf-8' });
        // 500 -> server error
        res.end(err.message);
    }
})
.listen(3000, () => {
    console.log('linkin to a server port 3000...');
});