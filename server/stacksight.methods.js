"use strict";

Meteor.methods({
    stacksightRegister: function (callback) {
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

        if (meanAppId) {
            console.log('app id', meanAppId);
            return meanAppId;
        }
    },
    stacksightSessionUp: function () {
        return Meteor.call('stacksightRegister');
    },
    getDefaultOpts: function () {
        return {
            desc: ''
        }
    }
});