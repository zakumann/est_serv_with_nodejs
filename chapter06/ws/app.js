const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const app = express();

const webSocket = require('./socket.js');

/* port Setting */
app.set('port', process.env.PORT || 8080);

/* general middlewere*/
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('wsExample'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'wsExample',
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

/* Router setting*/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

/* 404 error */
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} No Address`);
    error.status = 404;
    next(error);
});

/* error middlewere */
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send('error Occurred');
})

/* link to server and port*/
const server = app.listen(app.get('port'), () => {
    console.log('operating server port',app.get('port'))
});

webSocket(server); // share with ws and http