/**
 * Module that will handle our authentication tasks
 */
'use strict';

var User = require('../models/user'),
    LocalStrategy = require('passport-local').Strategy;

exports.config = function(settings) {

};

/**
 * A helper method to retrieve a user from a local DB and ensure that the provided password matches.
 * @param req
 * @param res
 * @param next
 */
exports.localStrategy = function() {

    return new LocalStrategy(function(username, password, done) {

        //Retrieve the user from the database by login
        User.findOne({
            login: username
        }, function(err, user) {
            //If something weird happens, abort.
            if (err) {
                return done(err);
            }

            //If we couldn't find a matching user, flash a message explaining what happened
            if (!user) {
                return done(null, false, {
                    message: 'Login not found'
                });
            }

            //Make sure that the provided password matches what's in the DB.
            if (!user.passwordMatches(password)) {
                return done(null, false, {
                    message: 'Incorrect Password'
                });
            }
            //If everything passes, return the retrieved user object.
            done(null, user);

        });
    });
};

/**
 * A helper method to determine if a user has been authenticated, and if they have the right role.
 * If the user is not known, redirect to the login page. If the role doesn't match, show a 403 page.
 * @param role The role that a user should have to pass authentication.
 */
exports.isAuthenticated = function() {

    return function(req, res, next) {
        //access map
        var auth = {
            '/admin': true,
            '/profile': true
        },
            blacklist = {
                'user': {
                    '/admin': true
                }
            },
            route = req.url,
            role = (req.user && req.user.role) ? req.user.role : '';
        if (!auth[route]) {
            next();
            return;
        }
        else if (!req.isAuthenticated()) {
            //If the user is not authorized, save the location that was being accessed so we can redirect afterwards.
            req.session.goingTo = req.url;
            req.flash('error', 'Please log in to view this page');
            res.redirect('/login');
        }
        //Check blacklist for this user's role
        else if (blacklist[role] && blacklist[role][route] === true) {
            var model = {url: route};

            //pop the user into the response
            res.locals.user = req.user;
            res.status(401);

            res.render('errors/401', model);
        } else {
            next();
        }

    };
};

/**
 * A helper method to add the user to the response context so we don't have to manually do it.
 * @param req
 * @param res
 * @param next
 */
exports.injectUser = function() {
    return function injectUser(req, res, next) {
        if (req.isAuthenticated()) {
            res.locals.user = req.user;
        }
        next();
    };
};
