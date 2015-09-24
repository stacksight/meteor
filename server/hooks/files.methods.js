"use strict";

var appId = Meteor.call('stacksightSessionUp');

var sts = Npm.require('stacksight')({
    user: settings.meanDevToken,
    appId: appId,
    allow: true
});

sts.session.up();

Meteor.methods({
    hookImageLoad: function (userId) {
        var user = Meteor.user();
        console.log('onImagePush event', userId);
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
    hookFileLoad: function (userId) {
        var user = Meteor.user();
        console.log('onImagePush event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'logged in',
            name: '',
            type: 'user',
            user: {
                name: user.username,
            }
        });
        sts.events.publish(opts);
    }
});