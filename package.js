Package.describe({
  name: 'udisun:stacksight',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'The official Meteor-StackSight Package Integration',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/linnovate/meteor-stacksight.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  // Meteor packages
  api.use(['underscore', 'http', 'differential:event-hooks', 'dbarrett:dropzonejs']);

  // Settings
  api.addFiles('private/settings.js', ['server', 'client']);

  // Client methods
  api.addFiles('client/startup/stacksight.load.js', ['client']);
  //api.addFiles('client/stacksight.dropzone.js', ['client']);

  // Server methods
  api.addFiles('server/stacksight.methods.js', ['server']);
  api.addFiles('server/lib/stacksight.js', ['server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('udisun:stacksight');
  api.addFiles('stacksight-tests.js');
});

/* This lets you use npm packages in your package*/
Npm.depends({
  "stacksight": "1.0.16"
});
