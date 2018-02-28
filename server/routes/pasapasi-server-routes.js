/*global require, module*/
'use strict';

let pasapasiCtrl = require('../controllers/pasapasi-server-controller');


module.exports = (app) =>{

	
	app.post('/location',pasapasiCtrl.updateUserLocation);
	// app.delete('/notes/:id',notesCtrl.deleteNote);


};