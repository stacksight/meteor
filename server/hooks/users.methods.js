"use strict";

var stacknode = StacksightMeteor.stackNode();

Meteor.methods({
    hookUserLogIn: function (userId) {
        console.log('onLoggedIn event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'logged in',
            type: 'user',
            name: ''
        }, StacksightMeteor.userInitEvent(userId));
        stacknode.events.publish(opts);
    },

    hookUserLogOut: function (userId) {
        console.log('onLoggedOut event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'logged out',
            type: 'user',
            name: ''
        }, StacksightMeteor.userInitEvent(userId));
        stacknode.events.publish(opts);
    },

    hookUserCreate: function (userId) {
        var user = Meteor.users.findOne({_id: userId});
        console.log('onCreateUser event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'added',
            name: user.username,
            type: 'user'
        }, StacksightMeteor.userInitEvent(user));
        stacknode.events.publish(opts);
    },

    hookUserDelete: function (userId) {
        console.log('onDeleteUser event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'deleted',
            name: userId,
            type: 'user'
        });
        stacknode.events.publish(opts);
    },

    hookUserCloseSession: function (userId) {
        var user = Meteor.users.findOne({_id: userId});
        console.log('onCloseSession event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'ended the session',
            name: user.username,
            type: 'user'
        }, StacksightMeteor.userInitEvent(user));
        stacknode.events.publish(opts);
    }
});