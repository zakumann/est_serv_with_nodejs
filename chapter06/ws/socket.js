const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => { // Connection
        const ip = req.headers['x-forwarded-for'] ||
                   req.connection.remoteAddress;
    console.log('New Client : ', ip);
    ws.on('message', (message) => { // Message from client
        console.log(message);
    });
    ws.on('error', (err) => { // error message
        console.error(err);
    });
    ws.on('close', () => {
        console.log('Client off-line', ip);
        clearInterval(ws.interval);
    });
    ws.interval = setInterval(() => { // message from server
        if (ws.readyState === ws.OPEN) {
            ws.send('Message from server.');
        }
    }, 3000);
    });
};