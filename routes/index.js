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
				res.json({ 'jobs': [{
					id: 1,
					title: 'American Signature',
					rrule: 'Weekly on Friday at 6am',
					createdDate: new Date(),
					lastRun: new Date("2014-04-11T06:00:00Z"),
					nextRun: new Date("2014-04-18T06:00:00Z"),
					isArchived: false,
					isActive: true
				}, {
					id: 2,
					title: 'Push notifications',
					rrule: 'Every 3 minutes',
					createdDate: new Date(),
					lastRun: new Date("2014-04-30T14:01:23Z"),
					nextRun: new Date("2014-04-30T14:04:23Z"),
					isArchived: false,
					isActive: true
				}]});
			}
		});
	});
};