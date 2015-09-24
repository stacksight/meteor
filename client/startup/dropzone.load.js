"use strict";

Meteor.startup(function () {
    if (Meteor.isClient) {
        if (typeof Package['dbarrett:dropzonejs'] !== 'undefined') {
            console.log('onRedered pre outside');
            console.log(Template.body);
            Template.body.onRendered(function () {
                console.log('onRedered outside');
            });
        }
    }
});
