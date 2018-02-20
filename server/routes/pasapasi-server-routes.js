'use strict';
/* global require*/
/* global process, console */
/* jshint node: true, quotmark: false */


/*let config = require('./config/config.js');
let express = require('express');
let app = express();
let http = require('http');
let cors = require('cors');
let winston = require('winston');
let slacklog = require('slacklog');
let passport = require('passport');
let q = require('q');
let _ = require('underscore');
let mysql = require('mysql');
let StrategyGoogle = require('passport-google-openidconnect').Strategy;
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let mongoConnectionUrl = 'mongodb://localhost:27017/notesusers';


let connInfo = config.sqlconn;
connInfo.multipleStatements = true;

let googleAuthParams = {
    clientID: config.googleauth.clientid,
    clientSecret: config.googleauth.clientsecret,
    callbackURL: config.googleauth.callbackUrl,
    passReqToCallback: true
};

app.use(session({
    secret: config.sessionSecret,
    name: "notes",
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000},
    store: new MongoStore({
        url: mongoConnectionUrl,
        ttl: 1 * 24 * 60 * 60, // = 1 days. Default 
        autoRemove: 'native'
    }),
    resave: true,
    saveUninitialized: true
}));


function saveUserProfile(profile) {
    let deferred = q.defer();
    let connection = mysql.createConnection(connInfo);

    let params = [];
    let q1 = `Insert into notesusers (email,name,photoUrl) VALUES (?,?,?) 
    		  on DUPLICATE key update 
    		  name = values(name),
    		  photoUrl = values(photoUrl);`;
    
    params.push(profile._json.email,profile._json.name,profile._json.picture);
  
    let q2 = "Select * from notesusers where email = ?;";

    params.push(profile._json.email);

    connection.query(q1 + q2, params, function(err, results) {
        if (err) {
            winston.error(err);
            deferred.reject(err);
        }

        let user = results[1][0];

        if(results[1][0]){
            deferred.resolve(user);
        }

        deferred.resolve();
    });

    connection.end();
    return deferred.promise;
}

passport.use(new StrategyGoogle(googleAuthParams,
  function(req, iss, sub, profile, accessToken, refreshToken, done) {

        saveUserProfile(profile).then(function(user) {
            if (_.isEmpty(user)) {
                return done(null, false);
            }

            return done(null, profile);

        });  
  }
));

app.use(passport.initialize());
app.use(passport.session());

function getUserInfo(email) {
    var deferred = q.defer();
    var connection = mysql.createConnection(connInfo);

    var query = "Select * from notesusers where email = ?;";

    connection.query(query, [email], function(err, result) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(result[0]);
        }
    });
    connection.end();
    return deferred.promise;
}

passport.serializeUser(function(req, user, done) {

    let userDetails = {};
    userDetails.name = user._json.name;
    userDetails.picture = user._json.picture;
    userDetails.email = user._json.email;

    getUserInfo(user._json.email).then(function(result) {
        userDetails.userId = result.id;
        return done(null, userDetails);
    }, function(err) {
        winston.error(err);
    });

});

passport.deserializeUser(function( user, done) {
  done(null, user);
});

app.get('/auth/google', passport.authenticate('google-openidconnect', {
    scope: ['email', 'profile']
}));

app.get('/auth/google/callback', passport.authenticate('google-openidconnect', {
    successRedirect: config.googleauth.redirect,
    failureRedirect: config.googleauth.failureRedirect
}));

app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : false);
});

app.get('/logout', function(req, res) {
    req.logout();
    res.send();
});

winston.add(slacklog, {
    level: 'error',
    moduleName: 'Notes'
});

let bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(cors({
    origin: [config.notes.corsorigin],
    credentials: true
}));

if (!process.env.NODE_ENV) {
    app.use(require('morgan')('dev'));
}

function auth() {
    return function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
                next();
        }
    };
}

let notesRoutes = require('./routes/notes-server-routes.js');
notesRoutes(app,auth);

let server = http.createServer(app);
server.listen(config.notes.port);

*/