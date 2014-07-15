module.exports = function (app) {
    // databases
    var client = require('../lib/redis');
	var db = require('../lib/mongodb');
	var mongoose = require('mongoose');
	var schema = require('../model/schema');

	var Job = mongoose.model('Job');
	var User = mongoose.model('User');
	var Account = mongoose.model('Account');

	// *** USERS RESOURCES ***
	app.post('/api/v1/users', function(req, res) {
		var email = req.body.email;
		User.findOne({ 'email': email }).exec(function (error, user) {
			if (error) {
				console.log(error);
				res.json(500, { error: error });
			} else {
				console.dir(user);
				res.json(201, 'CREATED');
			}
		});
	});

	// *** ACCOUNTS RESOURCES ***

	// LIST ALL ACCOUNTS
	// curl -v http://localhost:3000/api/v1/accounts
	app.get('/api/v1/accounts', function(req,res) {
		Account.find({ 'isArchived': false }, function(error, accounts) {
			if (error) {
				console.log(error);
				res.json(500, { error: error });
			} else {
				res.json({ 'accounts': accounts});
			}
		});
	});

	// CREATE AN ACCOUNT
	// curl -d '{ "name": "CloudCron" }' -v http://localhost:3000/api/v1/accounts --header "Content-Type: application/json"
	app.post('/api/v1/accounts', function(req, res) {
		console.dir(req.body);
		Account.create(req.body, function(error, result) {
			if (error) {
				console.log(error);
				res.json(500, { error: error });
			} else {
				console.dir(result);
				res.json(201, result);
			}
		});
	});

	// *** ACCOUNT RESOURCES ***

	// RETRIEVE AN ACCOUNT
	// curl -v http://localhost:3000/api/v1/accounts/53abcb60f99eb8e833458dc7
	app.get('/api/v1/accounts/:account_id', function(req, res) {
		Account.findOne({ '_id': req.params.account_id }, function(error, account) {
			if (error) {
				console.log(error);
				res.json(500, { error: error });
			} else {
				console.dir(account);
				res.json(account);
			}
		});
	});

	// ***** ACCOUNT USERS RESOURCES *****

	// LIST ALL ACCOUNT USERS
	app.get('/api/v1/accounts/:account_id/users', function(req, res) {
		User.find({ 'account': req.params.account_id }, function(error, users) {
			if (error) {
				console.log(error);
				res.json(500, { error: error });
			} else {
				res.json({ 'users': users });
			}
		});
	});

	// ADD USER TO ACCOUNT
	app.put('/api/v1/accounts/:account_id/users/:user_id', function(req, res) {
		Account.update({ 'account': req.params.account_id }, { '$addToSet': { users: req.params.user_id } }, 
		function(error, account) {
			if (error) {
				console.log(error);
				res.json(500, { error: error });
			} else {
				res.json(account);
			}
		});
	});

	// ***** ACCOUNT JOBS RESOURCES *****

	// LIST ALL ACCOUNT JOBS
	app.get('/api/v1/accounts/:account_id/jobs', function(req, res) {
		Job.find({ 'account': req.params.account_id }, function(error, jobs) {
			if (error) {
				console.log(error);
				res.json(500, { error: error });
			} else {
				res.json({ 'jobs': jobs });
			}
		});
	});

	// *** JOBS RESOURCES ***

	// LIST ALL JOBS
	app.get('/api/v1/jobs', function(req,res) {
		Job.find({ 'isArchived': false, 'isActive': true }, function(error, jobs) {
			if (error) {
				console.log(error);
				res.json(500, { error: error });
			} else {
				res.json({ 'jobs': jobs });
			}
		});
	});

	// CREATE A JOB
	app.post('/api/v1/jobs', function(req, res) {
		console.log('received create job request');
		Job.create(req.body, function(error, result) {
			if (error) {
				console.log(error);
				res.json(500, { error: error });
			} else {
				console.dir(result);
				res.json(201, result);
			}
		});
	});

	// *** JOB RESOURCES ***

	// RETRIEVE A JOB
	app.get('/api/v1/jobs/:job_id', function(req, res) {
		Job.findOne({ '_id': req.params.job_id }, function(error, job) {
			if (error) {
				console.log(error);
				res.json(500, { error: error });
			} else {
				console.dir(job);
				res.json(job);
			}
		});
	});
};