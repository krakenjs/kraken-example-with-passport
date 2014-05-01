'use strict';


var IndexModel = require('../models/index'),
    ProfileModel = require('../models/profile'),
    AdminModel = require('../models/admin'),
    auth = require('../lib/auth');


module.exports = function (router) {

    var model = new IndexModel();
    var model = new ProfileModel();
    var model = new AdminModel();


    router.get('/', function (req, res) {
        res.render('index', model);
    });


    router.get('/profile', function(req, res) {
        res.render('profile', model);
    });


    router.get('/admin', auth.isAuthenticated('admin'), auth.injectUser(), function(req, res) {
        res.render('admin', model);
    });

    /**
     * Allow the users to log out
     */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

};
