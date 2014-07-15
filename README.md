cloudcron
=========

[![Build Status](https://magnum.travis-ci.com/Naviam/cloudcron.svg?token=4rGmbsqofyYvrbteixY9&branch=master)](https://magnum.travis-ci.com/Naviam/cloudcron)

- Docker image

install docker on macos: https://github.com/boot2docker/osx-installer/releases

- To run application please do the following:
* install nodejs and npm
* install bower
* execute npm install in the root project folder
* execute bower install in the root project folder
* run node app to start application
* open localhost:3000

- Useful tools:
Ember CLI : http://iamstef.net/ember-cli/

- Examples of Ember.js applications:

Sample application: https://github.com/stefanpenner/ember-app-kit/tree/master/app

http://to.be/explore/trending
and
https://fnd.io/

- Information about emberjs: 
http://emberwatch.com/

API Documentation

list all accounts
curl -v http://localhost:3000/api/v1/accounts

create account
curl -d '{ "name": "CloudCron" }' -v http://localhost:3000/api/v1/accounts --header "Content-Type: application/json"