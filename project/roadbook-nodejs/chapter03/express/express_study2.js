const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), () => {
    console.log('Operating a server to port', app.get('port'));
});