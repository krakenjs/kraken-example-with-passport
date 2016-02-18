/**
 * A model for email verification tokens
 */
'use strict';
var mongoose = require('mongoose'),
    userModel = require('./user'),
    uuid = require('node-uuid');

var emailVerificationTokenModel = function () {

    var emailVerificationTokenSchema = mongoose.Schema({
        _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        token: {type: String, required: true},
        createdAt: {type: Date, required: true, default: Date.now, expires: '4h'}
    });

    emailVerificationTokenSchema.methods.createToken = function (userId, next) {
        var token = uuid.v4();
        this.set('_userId', userId);
        this.set('token', token);
        this.save( function (err) {
            if (err) return next(err);
            return next(null, token);
        });
    };

    /**
     * Helper function that sets the isEmailVerified field to true for the user corresponding to this token
     * @param next
     */
    emailVerificationTokenSchema.methods.verify = function(next) {
        userModel.findOne({_id: this._userId}, function (err, user) {
            if (err) return next(err);
            user.isEmailVerified = true;
            user.save(function(err) {
                next(err, user);
            });
        });
    };

    return mongoose.model('EmailVerificationToken', emailVerificationTokenSchema);

};

module.exports = new emailVerificationTokenModel();
