'use strict';


var PageModel = require('../../models/pages/login'),
    passport = require('passport');


module.exports = function (router) {

    var model = {page: new PageModel()};


    /**
     * Display the login page. We also want to display any error messages that result from a failed login attempt.
     */
    router.get('/', function (req, res) {

        //Include any error messages that come from the login process.
        model.messages = req.flash('error');
        res.render('login', model);
    });

    /**
     * Receive the login credentials and authenticate.
     * Successful authentications will go to /profile or if the user was trying to access a secured resource, the URL
     * that was originally requested.
     *
     * Failed authentications will go back to the login page with a helpful error message to be displayed.
     */
    router.post('/', function (req, res) {

        passport.authenticate('local', {
            successRedirect: req.session.goingTo || '/profile',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res);

    });


};
