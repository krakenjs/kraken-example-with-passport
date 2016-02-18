'use strict';

var User = require('../../models/user'),
    PageModel = require('../../models/pages/register');


module.exports = function (router) {

    var model = {page: new PageModel()};


    /**
     * Display the register page.
     */
    router.get('/', function (req, res) {
        res.render('register', model);
    });

    /**
     * Receive the registration credentials.
     * Successful registration will go to /profile or if the user was trying to access a secured resource, the URL
     * that was originally requested.
     *
     * Failed authentications will go back to the login page with a helpful error message to be displayed.
     */
    router.post('/', function (req, res) {
        var newUserCandidate = new User(req.body);

        // thwart attempts to bypass email verification
        newUserCandidate.set('isEmailVerified', false);

        //Retrieve the user from the database by login
        User.findOne({email: newUserCandidate.email}, function(err, user) {
            if(err){
                console.log('error registering user with email', req.body.email, 'error:\n', err);
                res.end(err);
            } else {
                if(user) {
                    // user with that email address already exists.
                    delete newUserCandidate.password;
                    res.render('register', {user: newUserCandidate, messages: ['Email already in use']});
                } else {
                    newUserCandidate.save(function(err){
                        // assume that saving the user went ok
                        newUserCandidate.sendVerificationEmail(req, function(err){
                            if(err){
                                res.end(err);
                            } else {
                                // this doesn't work, the user is not logged in.
                                // res.redirect('/profile');
                                res.render('register-success', {user: newUserCandidate});
                            }
                        });
                    });
                }
            }
        });

    });

};
