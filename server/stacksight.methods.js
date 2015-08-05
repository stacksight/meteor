"use strict";

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
// console.log('res', res);
		var meanAppId = '55c1fa06443caf2175424bd8'; //'';
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
	stacksightSessionUp: function() {
		return Meteor.call('stacksightRegister');
	},
	getDefaultOpts: function() {
		return { 
			design: {
				color: '#de4f4f',
				icon: 'fa-general'
			},
			description: ''
		}
	},
  pushImage: function (imageData) {
  	var meanAppId = Meteor.call('stacksightSessionUp');
		
		var sts = Npm.require('stacksight')({
			user: settings.meanDevToken,
			appId: meanAppId,
			allow: true
		});
  	
		var opts = Meteor.call('getDefaultOpts');
		opts.design.icon = 'fa-upload';
		opts.description = 'image uploaded';
		opts.img = imageData;
	
  	sts.events.publish('image', 'upload', opts);
  }
});