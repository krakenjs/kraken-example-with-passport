/**
 * A model for our user
 */
'use strict';
var nodemailer = require('nodemailer');
var sparkPostTransport = require('nodemailer-sparkpost-transport');
var emailVerificationTokenModel = require('../models/emailVerificationToken');

// var emailCredentials = {
//     service: 'gmail',
//     auth: {
//         user: '',
//         pass: ''
//     }
// };
// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport("SMTP", emailCredentials);

var transporter = nodemailer.createTransport(sparkPostTransport({sparkPostApiKey: process.env.sparkPostApiKey}));



// todo - figure out how to use the app.render() method instead of the nodemailer templating

var Email = {
    sendVerificationEmail: function(user, req, next){
        new emailVerificationTokenModel().createToken(user._id, function (err, token) {
            if (err) return console.log("Couldn't create verification token", err);

            // the sparkpost way...
            transporter.sendMail({
                substitution_data: {
                    firstName: user.firstName,
                    verificationUrl: req.protocol + "://" + req.get('host') + "/verify/" + token
                },
                content: {
                    template_id: "my-first-email"
                },
                recipients: [{
                    address: {
                        email: user.email,
                        name: user.firstName + ' ' + user.lastName
                    }
                }]
            }, function(err){
                if(err){
                    console.log('there was an error sending the email');
                } else {
                    console.log('sent email to ', user.email);
                }
                next();
            });

            // the gmail/hotmail way...
            // transporter.templateSender({
            //     subject: 'Please verify your email for {{sitename}}',
            //     from: emailCredentials.auth.user,
            //     to: user.email,
            //     html: '<h1>{{user.firstName}}</h1><p>Please <a href="{{url}}">verify your email address</a>.</p>'
            // }, {
            //     user: user,
            //     url: req.protocol + "://" + req.get('host') + "/verify/" + token,
            //     sitename: 'kraken passport example'
            // }, function(err){
            //     console.log('sent email', err);
            //     next();
            // });

        });
    }
};

module.exports = Email;
