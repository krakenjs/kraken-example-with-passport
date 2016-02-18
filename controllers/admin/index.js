'use strict';


var PageModel = require('../../models/pages/admin');

module.exports = function (router) {

    var model = {page: new PageModel()};

    router.get('/', function (req, res) {
        res.render('admin', model);
    });

};
