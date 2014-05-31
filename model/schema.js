var mongoose = require('mongoose');

var task_types = 'ftp http zip s3 file execute'.split(' ');

var taskSchema = new mongoose.Schema({
	name: String,
	type: { type: String, enum: task_types }
});

var freq_enum = 'YEARLY MONTHLY WEEKLY DAILY HOURLY MINUTELY SECONDLY'.split(' ');
var wkst_enum = 'MO TU WE'.split(' ');

var jobSchema = new mongoose.Schema({
	name: String,
	tags: [String],
	rrule: { 
		text: { type: String, required: true },
		freq: { type: String, enum: freq_enum, required: true },
		dtstart: { type: Date, default: Date.now }, // The recurrence start.
		interval: { type: Number, default: 1 }, // The interval between each freq iteration. 
		wkst: { type: String, enum: wkst_enum, default: 'MO' }, // The week start day.
		count: Number, // How many occurrences will be generated.
		until: Date, // If given, this must be a Date instance, that will specify the limit of the recurrence.
		bysetpos: [Number], // If given, it must be either an integer, or a sequence of integers, positive or negative. 
		bymonth: [Number], // If given, it must be either an integer, or a sequence of integers, meaning the months to apply the recurrence to.
		bymonthday: [Number], // If given, it must be either an integer, or a sequence of integers, meaning the month days to apply the recurrence to.
		byyearday: [Number], // If given, it must be either an integer, or a sequence of integers, meaning the year days to apply the recurrence to.
		byweekno: [Number], // If given, it must be either an integer, or a sequence of integers, meaning the week numbers to apply the recurrence to. Week numbers have the meaning described in ISO8601, that is, the first week of the year is that containing at least four days of the new year.
		byweekday: [Number], // If given, it must be either an integer (0 == RRule.MO), a sequence of integers, one of the weekday constants (RRule.MO, RRule.TU, etc), or a sequence of these constants.
		byhour: [Number], // If given, it must be either an integer, or a sequence of integers, meaning the hours to apply the recurrence to.
		byminute: [Number], // If given, it must be either an integer, or a sequence of integers, meaning the minutes to apply the recurrence to.
		bysecond: [Number], // If given, it must be either an integer, or a sequence of integers, meaning the seconds to apply the recurrence to.
		byeaster: [Number] // This is an extension to the RFC specification which the Python implementation provides. Not implemented in the JavaScript version.
	},
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
	_id: { type: String, lowercase: true, trim: true },
	openId: { type: Number, index: true },
	password: String,
	createdOn: { type: Date, default: Date.now },
	account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
});

mongoose.model('User', userSchema);