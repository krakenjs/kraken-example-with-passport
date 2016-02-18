'use strict';


module.exports = function (router) {

    router.get('/', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

};
