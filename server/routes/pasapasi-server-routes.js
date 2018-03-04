/*global require, module*/
'use strict';

let pasapasiCtrl = require('../controllers/pasapasi-server-controller');


module.exports = (app) =>{

	app.get('/nearby-people/lat/:lat/lng/:lng',pasapasiCtrl.getNearByPeople);
	app.post('/like/:userId',pasapasiCtrl.likeUser)
	app.post('/dislike/:userId',pasapasiCtrl.dislikeUser)

};