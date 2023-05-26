const express =require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

/* Setting port*/
app.set('port', process.env.PORT || 3000);

/* default middleware*/
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser('secret@1234'));
app.use(session({
    secret: 'secret@1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // session cookie options httpOnly, expires, domain, path, secure, sameSite
        httpOnly: true, //
    },
    // name: 'connect.sid'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Setting Routing */
app.get('/', (req, res) => {
    if (req.session.name){
        const output = `
            <h2>Log in...</h2><br>
            <p>Welcome, ${req.session.name}.</p>
        `
        res.send(oujtput);
    }else {
        const output = `
            <h2>You are not logged in...</h2><br>
            <p>Please, log in.</p>
        `
    res.send(output);
    }
});

app.get('/login', (req, res) => { // if you post
    console.log(req.session);
    //when you use cookie setting value from cookie.
    // res.cookie(name, value, options)
    // When you use session-cookie
    req.session.name = 'roadbook';
    res.end('Login ok')
});

app.get('/logout', (req, res) => {
    res.clearCookie('connect.sid'); // Delete session cookie
    res.end('Logout ok');
});

/* connect to the server and port*/
app.listen(app.get('port'), () => {
    console.log('Connect to the server port',app.get('port'))
})