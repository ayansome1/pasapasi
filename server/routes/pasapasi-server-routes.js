/*global require, module*/
'use strict';

let pasapasiCtrl = require('../controllers/pasapasi-server-controller');


module.exports = (app) =>{

	
	// app.post('/location',pasapasiCtrl.updateUserLocation);
	app.get('/nearby-people/lat/:lat/lng/:lng',pasapasiCtrl.getNearByPeople);
	// app.delete('/notes/:id',notesCtrl.deleteNote);


};