'use strict';

// get mailer config from environment
// (don't put secret things, like email API Key, directly in your code)
require('dotenv').config();

// now for everything else.

var kraken = require('kraken-js'),
    app = require('express')(),
    options = require('./lib/spec')(app),
    port = process.env.PORT || 8000;

app.use(kraken(options));

app.listen(port, function(err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});
