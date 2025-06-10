const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./connect');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const swaggerDocument = require('./swagger.json'); 
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    //This is the basic express session({..}) initialization.
    .use(passport.initialize())
    //init passport on every route call
    .use(passport.session())
    //allow passport to use 'express-session'
    .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})
    .use(cors({methodds: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH']}))
    .use(cors({ origin: '*'}))
// Swagger docs route
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
.use('/', require('./routes'));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
    // Here you would typically save the user to your database
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out')});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs'. session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});