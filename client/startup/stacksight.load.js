Meteor.startup(function() {
  Hooks.init({ updateFocus: settings.updateFocus });

  console.log('stacksight.dropzone.js', Package['dbarrett:dropzonejs']);

	if (typeof Package['dbarrett:dropzonejs'] !== 'undefined') {
		console.log('package dropzone exists');

		Template.dropzone.onRendered(function() {
			console.log('zones', Dropzone.instances);
			
			_.each(Dropzone.instances, function(dropz) {
				console.log('dropzone instance', dropz);
				dropz.on('thumbnail', function(file, dataUrl) { 
					console.log(file, dataUrl); 
					Meteor.call('pushImage', dataUrl);
				});
			});
		});
	}
});