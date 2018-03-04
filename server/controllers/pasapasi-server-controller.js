'use strict';
/* global require,module*/
let q = require('q');
let config = require('../config/config.js');
let mysql = require('mysql');
let winston = require('winston');
let connInfo = config.sqlconn;
connInfo.multipleStatements = true;

let updateUserLocation = (lat,lng,userId) => {

  let deferred= q.defer();
  let params = [];
  let connection = mysql.createConnection(connInfo);
  let query = `insert into location (user_id,lat,lng,last_active)
               values(?,?,?,NOW()) 
               on duplicate key update 
               user_id= values(user_id),
               lat=values(lat),
               lng=values(lng),
               last_active=values(last_active);`;
  params.push(userId,lat,lng);

  connection.query(query,params, (err, results) => {
    if (err) {
      winston.error(err);
      deferred.reject(err);
    } else {
      deferred.resolve()
    }
  });
  connection.end();
  return deferred.promise;
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
      if(results){
        deferred.resolve(results[0]);
      }
      else{
        deferred.resolve(null);
      }
    }
  });
  connection.end();
  return deferred.promise;
}

let nearByPeople = (lat,lng,userId,genderPreference) => {

  let deferred = q.defer();

  let connection = mysql.createConnection(connInfo);
  let params = [];
  let query = `SELECT 
                users.user_id,users.fb_id,location.last_active,users.first_name,users.fb_link,users.gender ,
                (
                   6371 *
                   acos(cos(radians(?)) * 
                   cos(radians(lat)) * 
                   cos(radians(lng) - 
                   radians(?)) + 
                   sin(radians(?)) * 
                   sin(radians(lat )))
                ) AS distance 
                FROM location inner join users on users.user_id=location.user_id
                HAVING distance < 20 and
                users.gender=? and user_id != ? 
                ORDER BY distance;`;
    params.push(lat,lng,lat,genderPreference,userId);

  let sql = connection.query(query,params, (err, results) => {

    // console.log(sql.sql);
    if (err) {
      winston.error(err);
      deferred.reject(err);
    } else {
      deferred.resolve(results);
    }
  });
  connection.end();
  return deferred.promise;

}

let getNearByPeople = (req,res) => {

  let lat = req.params.lat;
  let lng = req.params.lng;

  updateUserLocation(lat,lng,req.user.user_id).then(()=>{

    return getUserPreference(req.user.user_id);

  }).then((data)=>{

    let genderPreference;

    if(data){
      genderPreference = data.preferred_gender;
    }
    else if (req.user.gender==='M'){
      genderPreference = 'F';
    }
    else{
      genderPreference = 'M';
    }

    return nearByPeople(lat,lng,req.user.user_id,genderPreference);

    // console.log("**********************",data);
    // res.send(data);

    // console.log("user_preference:",data);

  }).then((data)=>{

    res.send(data);
  },(err)=>{
    winston.error(err);
    res.status.send(err);
  });

}


module.exports = {
  // updateUserLocation,
  getNearByPeople
};