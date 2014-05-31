module.exports = function (app) {
    // databases
    var client = require('../lib/redis');
	var db = require('../lib/mongodb');
	var mongoose = require('mongoose');
	var schema = require('../model/schema');

	var Job = mongoose.model('Job');

	app.get('/api/v1/jobs', function(req,res) {
		Job.find({ 'isArchived': false, 'isActive': true }, function(error, jobs) {
			if (error) {
				console.log(error);
			} else {
				console.dir(jobs);
				res.json({ 'jobs': jobs});
			}
		});
	});

	app.get('/api/v1/jobs/:job_id', function(req, res) {
		//console.dir(req);
		Job.findOne({ '_id': req.params.job_id }, function(error, job) {
			if (error) {
				console.log(error);
			} else {
				console.dir(job);
				res.json(job);
			}
		});
	});

	app.post('/api/v1/jobs', function(req, res) {
		console.log('received create job request');
		Job.create(req.body, function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.dir(result);
				res.json(result);
			}
		});
	});
};