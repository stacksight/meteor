"use strict";

var meanAppId = Meteor.call('stacksightSessionUp');
console.log(meanAppId);
var sts = Npm.require('stacksight')({
	user: settings.meanDevToken,
	appId: meanAppId,
	allow: true
});
sts.sessions.up();

Hooks.onLoggedIn = function (userId) {
	console.log('onLoggedIn event', userId);

	var opts = Meteor.call('getDefaultOpts');
	opts.design.icon = 'fa-sign-in';
	opts.description = 'user logged in -> ' + userId;
	// opts.user = {
	// 	name: '',
	// 	img: ''
	// };

	//console.log(Meteor.user());
	
  sts.events.publish('user', 'login', opts);
}

Hooks.onLoggedOut = function (userId) { 
	console.log('onLoggedOut event', userId);
	
	var opts = Meteor.call('getDefaultOpts');
	opts.design.icon = 'fa-sign-out';
	opts.description = 'user logged out -> ' + userId;
	
  sts.events.publish('user', 'logout', opts);
}

Hooks.onCreateUser = function (userId) { 
	console.log('onCreateUser event', userId);
	
	var opts = Meteor.call('getDefaultOpts');
	opts.design.icon = 'fa-user-plus';
	opts.description = 'user created -> ' + userId;

  sts.events.publish('user', 'created', opts);
}

Hooks.onDeleteUser = function (userId) {
	console.log('onDeleteUser event', userId);
	
	var opts = Meteor.call('getDefaultOpts');
	opts.design.icon = 'fa-trash-o';
	opts.description = 'user deleted -> ' + userId;

  sts.events.publish('user', 'deleted', opts);	
}

Hooks.onLoseFocus = function () {
	console.log('onLoseFocus event');	
	
	var opts = Meteor.call('getDefaultOpts');
	opts.design.icon = 'fa-trash-o';
	opts.description = 'focus lost';

  sts.events.publish('focus', 'lost', opts);	
}

Hooks.onGainFocus = function () {
	console.log('onGainFocus event');
	
	var opts = Meteor.call('getDefaultOpts');
	opts.design.icon = 'fa-trash-o';
	opts.description = 'focus gained';

  sts.events.publish('focus', 'gained', opts);		
}

Hooks.onCloseSession = function (userId) {
	console.log('onCloseSession event', userId);

	var opts = Meteor.call('getDefaultOpts');
	opts.design.icon = 'fa-trash-o';
	opts.description = 'session closed for user -> ' + userId;

  //sts.events.publish('session', 'close', opts);			
  //sts.sessions.down();
}