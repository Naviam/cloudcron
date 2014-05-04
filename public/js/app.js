var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.route('calendar', { path: '/calendar' });

  this.resource('jobs', function() {
    this.resource('job', { path: '/:job_id' });
    this.resource('new');
  });
});

App.IndexController = Ember.ArrayController.extend({
  jobsCount: function() {
	return this.get('length');
  }.property('length')
});

App.JobsNewController = Ember.ObjectController.extend({

});

App.JobsNewRoute = Ember.Route.extend({

});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('job');
	}
});

App.JobsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('job');
	}
});

App.JobRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('job', params.job_id);
	}
});

App.Job = DS.Model.extend({
  title: DS.attr('string'),
  rrule: DS.attr('string'),
  createdDate: DS.attr('date'),
  lastRun: DS.attr('date'),
  nextRun: DS.attr('date'),
  isArchived: DS.attr('boolean'),
  isActive: DS.attr('boolean'),
  tags: DS.hasMany('tag', {async: true}),
  tasks: DS.hasMany('task', {async: true})
});

App.Task = DS.Model.extend({
	name: DS.attr('string'),
	type: DS.attr('string'),
	lastRun: DS.attr('date'),
	output: DS.attr('string'),
	job: DS.belongsTo('job')
});

App.Tag = DS.Model.extend({
	name: DS.attr('string'),
	jobs: DS.hasMany('job')
});

App.Job.FIXTURES = [
  {
	id: 1,
    title: 'American Signature',
    rrule: 'Weekly on Friday at 6am',
    createdDate: new Date(),
    lastRun: new Date("2014-04-11T06:00:00Z"),
    nextRun: new Date("2014-04-18T06:00:00Z"),
    isArchived: false,
    isActive: true
  },
  {
	id: 2,
    title: 'Push notifications',
    rrule: 'Every 3 minutes',
    createdDate: new Date(),
    lastRun: new Date("2014-04-30T14:01:23Z"),
    nextRun: new Date("2014-04-30T14:04:23Z"),
    isArchived: false,
    isActive: true
  }
];

App.Task.FIXTURES = [
	{
		id: 1,
		name: 'Execute program',
		type: 'execute',
		lastRun: new Date(),
		output: 'result is ..'
	},
	{
		id: 2,
		name: 'Email results',
		type: 'email',
		lastRun: new Date(),
		output: 'email has been sent'
	}
];