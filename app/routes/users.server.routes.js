'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var agents = require('../../app/controllers/users');

	// Setting up the users profile api
	app.route('/users/me').get(agents.me);
	app.route('/users').put(agents.update);
	app.route('/users/accounts').delete(agents.removeOAuthProvider);
	app.route('/users/accomodation').get(agents.getByUserId);

	// Setting up the users password api
	app.route('/users/password').post(agents.changePassword);
	app.route('/auth/forgot').post(agents.forgot);
	app.route('/auth/reset/:token').get(agents.validateResetToken);
	app.route('/auth/reset/:token').post(agents.reset);

	// Setting up the users authentication api
	app.route('/auth/signup').post(agents.signup);
	app.route('/auth/signin').post(agents.signin);
	app.route('/auth/signout').get(agents.signout);

	

	// Finish by binding the user middleware
	
	app.param('userId', agents.agentByID);
};
