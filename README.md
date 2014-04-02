# with.passport

A simple application that manages users with [passport](http://passportjs.org/) and [KrakenJS](http://www.krakenjs.com)

## Introduction
In many cases you'll need to manage users in your application. Here's a simple application that will show you how to restrict access to certain
parts of your application based on user authentication.

This example highlights the following things:

* Using passport.js to handle user authentication.
* Using a mongoose model to represent user data.
* Using bcrypt to securely hash and salt user passwords before storing them in a database.
* Storing credentials in a Mongo database.
* Limiting access to certain parts of your application based on user roles.
* modifying elements of the user interface based on logged in/logged out user status.
* registering Kraken middleware via the JSON configuration files
* 

## Prerequisites
* This example requires that [MongoDB](http://www.mongodb.org/downloads) is installed and running on it's default port.
* You will --of course-- need [Node](http://nodejs.org) (Version >= 0.10.22 preferred)

## Installation
This example is a part of the kraken-examples repository. Clone, install and run.

```shell
$ git clone git@github.com:krakenjs/kraken-examples.git
$ cd kraken-examples
$ npm install
$ cd with.passport
$ ln -s ../package.json package.json & ln -s ../node_modules node_modules
$ npm start
```

## Explore the app

Visit http://localhost:8000

The site has a lovely kraken styling to it, with a tentacle reaching upwards towards the user interface elements.

There are four links: Home, Profile, Admin, Login. 

Clicking on each, you will note that as a logged out user, you are only able to view the Home and login screens. The other links will forward you to the login screen with a message.

There are two users added to the user schema: user/password: ash/ash and kraken/kraken. Ash has a role of 'user' while Kraken has a role of 'admin'.

Try logging in with each user and clicking around on the links again. Note that Ash can view the Profile page, but not the admin page. Kraken can view all pages. Also note that when a user is logged in, the Login link changes to a Logout link.

## Breaking down the changes

### Creating the users

### Configuring passport

### Configuring crypto