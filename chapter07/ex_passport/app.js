const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

/* port setting*/
app.set('port', process.env.PORT || 8080);

/* fake data */
let fakeUser = {
    username: 'test@test.com',
    password: 'test@1234'
}

/* general middleware */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('passportExample'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'passportExample',
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

/* passport middleware */
app.use(passport.initialize()); // reset passport
app.use(passport.session()); // connect passport session

/* treat session - if login success, call one time and save information that detected user*/
passport.serializeUser(function (user, done){
    console.log('serializeUser', user);
    done(null, user.username);
});

// Treat session - When invite on page after login, insert real data of user.
passport.deserializeUser(function (id, done){
    console.log('deserializeUser', id);
    done(null, fakeUser); // send to req.user
});

passport.use(new LocalStrategy(
    function (username, password, done){
        if (username === fakeUser.username){
            if (password === fakeUser.password){
                return done(null, fakeUser);
            }else {
                return done(null, false, { message: "password incorrect" });
            }
        } else {
            return done(null, false, { message: "username incorrect" });
        }
    }
));

/* setting router */
app.get('/', (req, res) => {
    if (!req.user){
        res.sendFile(__dirname + '/index.html');
    } else {
        const user = req.user.username;
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <p>Hello, ${user}!</p>
            <button type="button" onclick="href='location.href='/logout'">Log Out</button>
        </body>
        </html>
        `
        res.send(html);
    }
});

/* passport Login : strategy-Local */
/* Authenticate Requests */
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login'}),
  function(req,res){
    req.session.save(function(){
      res.redirect('/');      
    });
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

/* 404 error */
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} No Adress...`);
    error.status = 404;
    next(error);
});

/* error middleware*/
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'development' ? err : {};
    res.status(err.status || 500);
    res.send('error Occurred');
});

/* connect with server and port */
app.listen(app.get('port'), () => {
    console.log('Connecting to port',app.get('port'))
});