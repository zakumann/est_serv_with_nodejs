const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');

/* GET home page. */
app.get('/', function (req, res, next){
    res.render('index2', { menu: "HOME" });
});

app.get('/menu1', function (req, res, next){
    res.render('index2', { menu: "Menu1" });
});

app.get('/menu2', function (req, res, next){
    res.render('index2', { menu: "Menu2" });
});

app.get('/menu3', function (req, res, next){
    res.render('index2', { menu: "Menu3" });
});

app.listen(app.get('port'), () => {
    console.log('Connecting server to port',app.get('port'));
});