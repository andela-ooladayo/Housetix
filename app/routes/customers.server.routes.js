'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var customers = require('../../app/controllers/users');

	// Setting up the users profile api
	app.route('/customers/me').get(customers.me);
	app.route('/customers').put(customers.update);
	app.route('/customers/accounts').delete(customers.removeOAuthProvider);

	// Setting up the users password api
	app.route('/customers/password').post(customers.changePassword);
	app.route('/auth/forgot').post(customers.forgot);
	app.route('/auth/reset/:token').get(customers.validateResetToken);
	app.route('/auth/reset/:token').post(customers.reset);

	// Setting up the users authentication api
	app.route('/customers/signup').post(customers.signup);
	app.route('/customers/signin').post(customers.signin);
	app.route('/auth/signout').get(customers.signout);

	// Finish by binding the user middleware
	app.param('userId', customers.userByID);
};
