"use strict";

var stacknode = StacksightMeteor.stackNode();

Meteor.methods({
    hookImageLoad: function(data) {
        //console.log('onImagePush event', data);
        var subtype = data.filetype;
        var opts = _.extend(Meteor.call('getDefaultOpts'),
            {
                action: 'uploaded',
                type: 'file',
                id: data.id,
                name: data.name,
                data: {
                    file_name: data.name,
                    type: data.type,
                    size: data.size,
                    url: data.url
                }
            }, subtype, StacksightMeteor.userInitEvent()
        );
        stacknode.events.publish(opts);
    },
    hookFileLoad: function(data) {
        //console.log('onFilePush event', data);
        var opts = _.extend(Meteor.call('getDefaultOpts'),
            {
                action: 'uploaded',
                type: 'file',
                id: data.id,
                name: data.name,
                data: {
                    file_name: data.name,
                    type: data.type,
                    size: data.size,
                    url: data.url
                }
            }, StacksightMeteor.userInitEvent()
        );
        stacknode.events.publish(opts);
    }
});