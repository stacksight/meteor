Package.describe({
    name: 'udisun:stacksight',
    version: '0.1.2',
    // Brief, one-line summary of the package.
    summary: 'The official Meteor-StackSight Package Integration',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/linnovate/meteor-stacksight.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.3');

    // Meteor packages
    api.use(['underscore', 'http']);
    api.use(['differential:event-hooks@1.5.0']);
    api.use(['dbarrett:dropzonejs@4.0.2'], { weak: true });

    // Settings
    api.addFiles('private/settings.js', ['server', 'client']);

    // Client files
    api.addFiles('client/startup/stacksight.load.js', ['client']);
    api.addFiles('client/startup/dropzone.load.js', ['client']);

    // Server files
    api.addFiles('server/stacksight.methods.js', ['server']);
    api.addFiles('server/hooks/users.methods.js', ['server']);
    api.addFiles('server/lib/init.hooks.js', ['server']);
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('udisun:stacksight');
    api.addFiles('stacksight-tests.js');
});

/* This lets you use npm packages in your package*/
Npm.depends({
    "stacksight": "1.0.21"
});