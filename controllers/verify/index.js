'use strict';

var User = require('../../models/user'),
    EmailVerificationTokenModel = require('../../models/emailVerificationToken');


module.exports = function (router) {


    /**
     * Process the email verification token.
     */
    router.get('/:token', function (req, res) {
        var token = req.params.token;
        EmailVerificationTokenModel.findOne({token: token}, function (err, doc){
            if(err){
                console.log("email verification error", err);
            } else {
                if(doc) {
                    // token exists in database
                    doc.verify(function (err, user) {
                        if (err) {
                            // the token expired (?)
                            res.render("verification-failure");
                        } else {
                            res.render("verification-success");
                        }
                    });
                } else {
                    // token does not exist
                    res.render("verification-failure");
                }
            }
        });
    });


};