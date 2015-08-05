Meteor.startup(function() {
	if (typeof Package['dbarrett:dropzonejs'] !== 'undefined') {
		Template.dropzone.onRendered(function() {
			_.each(Dropzone.instances, function(dropz) {
				
				// Attach our event on dropzone 'thumbnail' event
				dropz.on('thumbnail', function(file, dataUrl) { 
					Meteor.call('pushImage', dataUrl);
				});
			});
		});
	}
});