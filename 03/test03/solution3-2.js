const express =require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('Main page');
});

app.get('/user/:id', (req, res) => {
    res.send(req.params.id + "'s personal page.");
});

app.listen(app.get('port'));