"use strict";

Meteor.startup(function () {

    Hooks.onLoggedIn = function (userId) {
        Meteor.call('hookUserLogIn', userId);
    }

    Hooks.onLoggedOut = function (userId) {
        Meteor.call('hookUserLogOut', userId);
    }

    Hooks.onCreateUser = function (userId) {
        Meteor.call('hookUserCreate', userId);
    }

    Hooks.onDeleteUser = function (userId) {
        Meteor.call('hookUserDelete', userId);
    }

    Hooks.onCloseSession = function (userId) {
        //Meteor.call('hookUserCloseSession', userId);
    }
});
