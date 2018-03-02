'use strict';
/* global require,module*/
let q = require('q');
let config = require('../config/config.js');
let mysql = require('mysql');
let winston = require('winston');
let connInfo = config.sqlconn;
connInfo.multipleStatements = true;

let updateUserLocation = (req,res) => {

  let data = req.body;
  console.log("***********************",data);
  let params = [];
  let connection = mysql.createConnection(connInfo);
  let query = `insert into location (user_id,lat,lng,last_active)
               values(?,?,?,NOW()) 
               on duplicate key update 
               user_id= values(user_id),
               lat=values(lat),
               lng=values(lng),
               last_active=values(last_active);`;
  params.push(req.user.user_id,data.lat,data.lng);

  connection.query(query,params, (err, results) => {
    if (err) {
      winston.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
  connection.end();
};

let getUserPreference = (user_id) => {

  let deferred = q.defer();

  let connection = mysql.createConnection(connInfo);
  let query = `select * from user_preference where user_id = ?;`;

  connection.query(query,[user_id], (err, results) => {
    if (err) {
      winston.error(err);
      deferred.reject(err);
    } else {
      console.log("user_preference for " + user_id + " is : " + results + "\n\n");
      deferred.resolve(results);
    }
  });
  connection.end();
  return deferred.promise;
}

let nearByPeople = (user_id) => {

  let deferred = q.defer();

  let connection = mysql.createConnection(connInfo);
  let query = `select * from user_preference where user_id = ?;`;

  connection.query(query,[user_id], (err, results) => {
    if (err) {
      winston.error(err);
      deferred.reject(err);
    } else {
      console.log("user_preference for " + user_id + " is : " + results + "\n\n");
      deferred.resolve(results);
    }
  });
  connection.end();
  return deferred.promise;

}

let getNearByPeople = (req,res) => {

  getUserPreference(req.user.user_id).then((data)=>{

    res.send(data);

    console.log("user_preference:",data);

  },(err)=>{
    winston.error(err);
    res.status.send(err);
  });

}


module.exports = {
  updateUserLocation,
  getNearByPeople
};