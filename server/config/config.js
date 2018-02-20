'use strict';

/*jshint node:true*/
/* global process, console, exports:true, module */

var environment = process.env.NODE_ENV;
console.log("environmement is " ,environment);
var config;
if (environment === 'production') {
	console.log("using config prod");
	config = require('./config_prod.json');
} else if (environment === 'staging') {
	config = require('./config_test.json');
} else {
	config = require('./config.json');
}

exports = module.exports = config;