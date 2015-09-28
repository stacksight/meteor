"use strict";

var stacknode = StacksightMeteor.stackNode();

Meteor.startup(function () {
    Meteor.methods({
        hookCollectionAfterInsert: function(userId, doc, collection_opts) {
            //console.log('hookCollectionAfterInsert event');
            var opts = _.extend(Meteor.call('getDefaultOpts'), {
                action: 'added '+collection_opts.type,
                type: collection_opts.type,
                name: doc[collection_opts.name]
            }, StacksightMeteor.userInitEvent(userId));
            stacknode.events.publish(opts);
        },
        hookCollectionAfterUpdate: function(userId, doc, fieldNames, modifier, options, collection_opts) {
            //console.log('hookCollectionAfterRemove event');
            var opts = _.extend(Meteor.call('getDefaultOpts'), {
                action: 'updated '+collection_opts.type,
                type: collection_opts.type,
                name: doc[collection_opts.name]
            }, StacksightMeteor.userInitEvent(userId));
            stacknode.events.publish(opts);
        },
        hookCollectionAfterRemove: function(userId, doc, collection_opts) {
            //console.log('hookCollectionAfterRemove event');
            var opts = _.extend(Meteor.call('getDefaultOpts'), {
                action: 'removed '+collection_opts.type,
                type: collection_opts.type,
                name: doc[collection_opts.name]
            }, StacksightMeteor.userInitEvent(userId));
            stacknode.events.publish(opts);
        },
        hookCollectionAfterFind: function(userId, selector, options, collection_opts) {
            //console.log('hookCollectionAfterFind event');
        },
        hookCollectionAfterFindOne: function(userId, selector, options, collection_opts) {
            //console.log('hookCollectionAfterFindOne event');
        }
    });
});
