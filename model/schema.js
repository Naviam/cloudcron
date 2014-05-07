var mongoose = require('mongoose');

var task_types = 'ftp http zip s3 file execute'.split(' ');

var taskSchema = new mongoose.Schema({
	name: String,
	type: { type: String, enum: task_types }
});

var jobSchema = new mongoose.Schema({
	name: String,
	tags: [String],
	rrule: String,
	createdOn: { type: Date, default: Date.now },
	lastRun: Date,
	nextRun: Date,
	isArchived: Boolean,
	isActive: Boolean,
	tasks: [taskSchema]
});

mongoose.model('Job', jobSchema);

var accountSchema = new mongoose.Schema({
	name: String,
	created: {
		on: { type: Date, default: Date.now },
		by: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	},
	users: [userSchema],
	jobs: [jobSchema]
});

mongoose.model('Account', accountSchema);

var userSchema = new mongoose.Schema({
	openId: { type: Number, index: true },
	email: { type: String, index: true },
	password: String,
	createdOn: { type: Date, default: Date.now },
	account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
});

mongoose.model('User', userSchema);