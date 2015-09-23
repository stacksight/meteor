"use strict";

var appId = Meteor.call('stacksightSessionUp');

var sts = Npm.require('stacksight')({
    user: settings.meanDevToken,
    appId: appId,
    allow: true
});

sts.session.up();

Meteor.methods({
    hookUserLogIn: function (userId) {
        var user = Meteor.user();
        console.log('onLoggedIn event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'logged in',
            name: '',
            type: 'user',
            user: {
                name: user.username,
            }
        });
        sts.events.publish(opts);
    },

    hookUserLogOut: function (userId) {
        var user = Meteor.users.findOne({_id: userId});
        console.log('onLoggedOut event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'logged out',
            name: '',
            type: 'user',
            user: {
                name: user.username,
            }
        });
        sts.events.publish(opts);
    },

    hookUserCreate: function (userId) {
        var user = Meteor.users.findOne({_id: userId});
        console.log('onCreateUser event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'added',
            name: user.username,
            type: 'user',
            user: {
                name: user.username,
            }
        });
        sts.events.publish(opts);
    },

    hookUserDelete: function (userId) {
        console.log('onDeleteUser event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'deleted',
            name: userId,
            type: 'user'
        });
        sts.events.publish(opts);
    },

    hookUserCloseSession: function (userId) {
        var user = Meteor.users.findOne({_id: userId});
        console.log('onCloseSession event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'ended the session',
            name: user.username,
            type: 'user',
            user: {
                name: user.username,
            }
        });
        sts.events.publish(opts);
    }
});