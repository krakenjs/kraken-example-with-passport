/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest'),
    spec = require('../lib/spec');


describe('/login', function () {

    var app, mock;


    beforeEach(function (done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: process.cwd(),
            onconfig: spec(app).onconfig
        }));

        mock = app.listen(1337);

    });


    afterEach(function (done) {
        mock.close(done);
    });


    it('should say "Login"', function (done) {
        request(mock)
            .get('/login')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/Login/)
            .end(function (err, res) {
                done(err);
            });
    });

});