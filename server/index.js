'use strict';
/* global require*/
/* global process, console */
/* jshint node: true, quotmark: false */


let config = require('./config/config.js');
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
var FacebookStrategy = require('passport-facebook').Strategy;
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let mongoConnectionUrl = 'mongodb://localhost:27017/pasapasiusers';


let connInfo = config.sqlconn;
connInfo.multipleStatements = true;

let facebookAuthParams = {
    clientID: config.facebookAuth.clientid,
    clientSecret: config.facebookAuth.clientsecret,
    callbackURL: config.facebookAuth.callbackUrl,
    profileFields: ['id', 'displayName', 'email', 'first_name', 'middle_name', 'last_name','photos', 'birthday', 'friends','gender','link'],
    passReqToCallback: true
};



app.use(session({
    secret: config.sessionSecret,
    name: "pasapasi",
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000},
    store: new MongoStore({
        url: mongoConnectionUrl,
        ttl: 1 * 24 * 60 * 60, // = 1 days. Default 
        autoRemove: 'native'
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



function saveUserProfile(profile) {


    let deferred = q.defer();
    let connection = mysql.createConnection(connInfo);

    let params = [];
    let q1 = `Insert into users (email,name,gender,first_name,fb_link,fb_id) VALUES (?,?,?,?,?,?) 
    		  on DUPLICATE key update 
    		  name = values(name),
    		  email = values(email),
              gender = values(gender),
              first_name = values(first_name),
              fb_link = values(fb_link),
              fb_id = values(fb_id);`;
    
    params.push(profile.email,profile.name,profile.gender,profile.first_name,profile.fb_link,profile.fb_id);
  
    let q2 = "Select * from users where fb_id = ?;";

    params.push(profile.fb_id);

    connection.query(q1 + q2, params, function(err, results) {


        if (err) {
            winston.error(err);
            deferred.reject(err);
        }


        let user = results[1][0];

        if(user){
            deferred.resolve(user);
        }
        else{
            deferred.resolve();
        }

    });


    connection.end();
    return deferred.promise;
}

passport.use(new FacebookStrategy(facebookAuthParams,
  function(req, accessToken, refreshToken, profile, done) {

        let userProfile = {};

        userProfile.email = profile._json.email || null;
        userProfile.fb_id = profile._json.id || null;
        userProfile.name = profile._json.name || null;
        userProfile.first_name = profile._json.first_name || null;
        userProfile.fb_link = profile._json.link || null;

        
        if(profile._json.gender == 'male'){
            userProfile.gender = 'M';
        }
        else if(profile._json.gender == 'female'){
            userProfile.gender = 'F';
        }
        else{
            userProfile.gender = 'O';
        }


        saveUserProfile(userProfile).then(function(user) {


            if (_.isEmpty(user)) {
                return done(null, false);
            }

            return done(null, user);

        },function(err){
            return done(err,false);//check this
        });  

  }
));






function getUserInfo(fb_id) {
    var deferred = q.defer();
    var connection = mysql.createConnection(connInfo);

    var query = "Select * from users where fb_id = ?;";

    connection.query(query, [fb_id], function(err, result) {
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

    done(null, user.fb_id);

});



passport.deserializeUser(function(fb_id, done) {

    getUserInfo(fb_id).then(function(result) {
        return done(null, result);
    }, function(err) {
        return done(err,null);
        winston.error(err);
    });
});

app.get('/auth/facebook', passport.authenticate('facebook', 
    {
        scope: ['user_friends', 'email', 'public_profile']
    }

));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: config.facebookAuth.redirect,
    failureRedirect: config.facebookAuth.failureRedirect
}));

app.get('/loggedin', function(req, res) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$req.user is : ",req.user);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$req.isAuthenticated is : ",req.isAuthenticated());

    res.send(req.isAuthenticated() ? req.user : 'false');
});

/*app.get('/abc', function(req, res) {
    res.send("yeahhhhhhhhhhhhhhhhhh");
});*/

app.get('/logout', function(req, res) {
    req.logout();
    res.send();
});

winston.add(slacklog, {
    level: 'error',
    moduleName: 'Pasapasi'
});

let bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(cors({
    origin: [config.pasapasi.corsorigin],
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

// let pasapasiRoutes = require('./routes/pasapasi-server-routes.js');
// pasapasiRoutes(app,auth);


let server = http.createServer(app);
server.listen(config.pasapasi.port);

