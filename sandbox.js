const express = require ('express');
const app = express();
const session = require('express-session');


app.set('trust proxy', 1);

app.use(session({
    secret: 'SECRET_KEY', //to open data session
    saveUninitialized: true,
    cookie: {}
})) //MIDDLEWARE - will keep the data from the session

app.get('/login', function (req, res) {
    req.session.username = 'dimitri';
    req.session.role = 'admin';
    res.send('saved to session')
})

app.get('/contacts', function (req, res) {
    //req.session
    res.send(req.session.username);
})

app.get('/', function (req, res) {
    //req.session
    res.send(req.session.username);
})

app.get('/logout', function (req, res) {
    req.session.destroy();
})

app.listen(3030, () => console.log('conected')
)