/**
 * A model for our user
 */
'use strict';
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    crypto = require('../lib/crypto'),
    Email = require('../lib/email');

var userModel = function () {

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        email: { type: String, unique: true },  //Ensure emails are unique.
        password: String, //We'll store bCrypt hashed passwords.  Just say no to plaintext!
        isEmailVerified: Boolean,
        roles: [String]
    });

    /**
     * Helper function that hooks into the 'save' method, and replaces plaintext passwords with a hashed version.
     */
    userSchema.pre('save', function (next) {
        var user = this;

        //If the password has not been modified in this save operation, leave it alone (So we don't double hash it)
        if (user.isModified('password')) {
            //Replace the plaintext pw with Hash+Salted pw;
            user.password = bcrypt.hashSync(user.password, crypto.getCryptLevel());
        }

        //Continue with the save operation
        next();
    });

    /**
     * Helper function that takes a plaintext password and compares it against the user's hashed password.
     * @param plainText
     * @returns true/false
     */
    userSchema.methods.passwordMatches = function (plainText) {
        var user = this;
        return bcrypt.compareSync(plainText, user.password);
    };

    // todo - doc
    userSchema.methods.sendVerificationEmail = function (req, next) {
        var user = this;
        Email.sendVerificationEmail(user, req, function (err) {
            if (err) {
                // not much point in attempting to send again, so we give up
                // will need to give the user a mechanism to resend verification
                console.error("Unable to send email: " + err.message);
                next(err);
            } else {
                next();
            }
        });
    };


    return mongoose.model('User', userSchema);
};

module.exports = new userModel();
