module.exports = function (app) {
    // databases
    var client = require('../lib/redis');
	var db = require('../lib/mongodb');
	var mongoose = require('mongoose');
	var schema = require('../model/schema');

	app.get('/api', function(res,req) { return res.json(); });
};