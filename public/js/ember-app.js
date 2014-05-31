Ember.Application.initializer({
    name: 'userapp',
    initialize: function(container, application) {
        Ember.UserApp.setup(application, {
          appId: '53895b38c03b4',
          usernameIsEmail: true
        });
    }
});
var App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	Socket: EmberSockets.extend({
        host: 'localhost',
        port: 3000,
        controllers: ['jobs', 'index']
    })
});
App.ApplicationAdapter = DS.RESTAdapter.extend({ namespace: 'api/v1' });
App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
});

App.Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('calendar', { path: '/calendar' });
  this.resource('jobs', function() {
    this.resource('job', { path: '/:job_id' });
  });
});

App.ApplicationRoute = Ember.Route.extend(Ember.UserApp.ApplicationRouteMixin);
App.SignupController = Ember.Controller.extend(Ember.UserApp.FormControllerMixin);
App.LoginController = Ember.Controller.extend(Ember.UserApp.FormControllerMixin);
App.IndexRoute = Ember.Route.extend(Ember.UserApp.ProtectedRouteMixin);

App.IndexController = Ember.ArrayController.extend({});

App.JobsContoller = Ember.ArrayController.extend({
	sockets: {
		newJob: function(job) {
			alert('test');
			console.log(job);
			this.store.load(job);
		},
		// When EmberSockets makes a connection to the Socket.IO server.
        connect: function() {
            console.log('EmberSockets has connected...');
        },

        // When EmberSockets disconnects from the Socket.IO server.
        disconnect: function() {
            console.log('EmberSockets has disconnected...');
        }
	}
});

App.JobController = Ember.ObjectController.extend({
  actions: {
    createJob: function() {
      console.log('createjob');
      //this.store.addObject(job);
      //this.socket.emit('newJob');
    }
  }
});

App.IndexRoute = Ember.Route.extend({
	beforeModel: function() {
		this.transitionTo('jobs');
	}
});

App.JobsIndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('job');
	}
});

App.JobsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('job');
	}
});

App.JobsJobRoute = Ember.Route.extend({
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
  isActive: DS.attr('boolean')
  // tags: DS.hasMany('tag', {async: true}),
  // tasks: DS.hasMany('task', {async: true})
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