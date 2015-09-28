//"use strict";
StacksightMeteor = {
    stackNode: function(){
        var appId = Meteor.call('stacksightSessionUp');
        var stacknode = Npm.require('stacksight')({
            user: settings.meanDevToken,
            appId: appId,
            allow: true
        });
        stacknode.session.up();
        return stacknode;
    },
    userInitEvent: function(user) {
        if(user !== undefined) {
            if(typeof user !== 'object'){
                user = Meteor.users.findOne({_id: user});
            }
            return (user) ? {
                user: {
                    name: user.username,
                }
            } : null;
        } else {
            var user = Meteor.user();
            return (Meteor.userId()) ? {
                user: {
                    name: user.username,
                }
            } : null;
        }
    },
    extendsCollections: function(collections){
        _.each(collections, function(collectionobj) {
            var collection = collectionobj.collection;
            var collection_opts = {
                type: collectionobj.type,
                name: collectionobj.name
            };
            collection.after.insert(function (userId, doc){
                Meteor.call('hookCollectionAfterInsert', userId, doc, collection_opts);
            });
            collection.after.update(function (userId, doc, fieldNames, modifier, options) {
                Meteor.call('hookCollectionAfterUpdate', userId, doc, fieldNames, modifier, options, collection_opts);
            });
            collection.after.remove(function (userId, doc) {
                Meteor.call('hookCollectionAfterRemove', userId, doc, collection_opts);
            });
            collection.after.find(function (userId, selector, options) {
                Meteor.call('hookCollectionAfterFind', userId, selector, options, collection_opts);
            });
            collection.after.findOne(function (userId, selector, options) {
                Meteor.call('hookCollectionAfterFindOne', userId, selector, options, collection_opts);
            });
        });
    }
}

Meteor.methods({
    stacksightRegister: function(callback) {
        var body = {
            name: 'meteor-stacksight',
            description: 'first test',
            version: '1.0.0',
            platform: 'meteor',
            keywords: ['test', 'ehud']
        };

        var options = {
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'authorization': settings.meanDevToken
            }
        };

        console.log('about to call post');
        // 		var res = HTTP.post(settings.napi + '/app/init', options);
        //		console.log('res', res);
        //		var meanAppId = '55c1fa06443caf2175424bd8'; //'';
        var meanAppId = settings.appId; //'';
        // if (res) {
        // 	meanAppId = res.content._id;
        // }
        // else if (result.data.type == 'exists') {
        // 	meanAppId = result.data.app.id;
        // }

        if(meanAppId) {
            console.log('app id', meanAppId);
            return meanAppId;
        }
    },
    stacksightSessionUp: function() {
        return Meteor.call('stacksightRegister');
    },
    getDefaultOpts: function() {
        return {
            desc: ''
        }
    }
});