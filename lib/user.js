'use strict';

var User = require('../models/user');

var UserLibrary = function() {
    return {
        addUsers: function() { //add two users
            //Ignore errors. In this case, the errors will be for duplicate keys as we run this app more than once.

            //add admin user: kraken
            (new User({
                firstName: 'Kraken',
                lastName: 'McSquid',
                email: 'kraken@kraken.com',
                password: 'kraken',
                roles: ['admin']
            })).save();

            //add regular user: ash -- ash has no roles!  but he *is* a user, so that should suffice for the profile page.
            (new User({
                firstName: 'Ash',
                lastName: 'Williams',
                email: 'ash@ash.com',
                password: 'ash'
            })).save();
        },
        serialize: function(user, done) {
            done(null, user.id);
        },
        deserialize: function(id, done) {
            User.findOne({
                _id: id
            }, function(err, user) {
                done(null, user);
            });
        }
    };
};

module.exports = UserLibrary;
