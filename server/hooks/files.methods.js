"use strict";

var appId = Meteor.call('stacksightSessionUp');

var stacknode = Npm.require('stacksight')({
    user: settings.meanDevToken,
    appId: appId,
    allow: true
});

stacknode.session.up();

Meteor.methods({
    hookImageLoad: function (data) {
        var user = Meteor.user();
        //console.log('onImagePush event', data);
        var userobj = (Meteor.userId()) ? {
            user: {
                name: user.username,
            }
        } : null;
        var subtype = data.filetype;
        console.log(subtype);
        var opts = _.extend(Meteor.call('getDefaultOpts'),
            {
                action   : 'uploaded',
                type     : 'file',
                id       : data.id,
                name     : data.name,
                data     : {
                    file_name : data.name,
                    type      : data.type,
                    size      : data.size,
                    url       : data.url
                }
            }, subtype, userobj
        );
        console.log(opts);
        stacknode.events.publish(opts);
    },

    hookFileLoad: function (userId) {
        var user = Meteor.user();
        console.log('onFilePush event', userId);
        var opts = _.extend(Meteor.call('getDefaultOpts'), {
            action: 'logged in',
            name: '',
            type: 'user',
            user: {
                name: user.username,
            }
        });
        stacknode.events.publish(opts);
    }
});