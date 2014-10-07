'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var agents = require('../../app/controllers/users');

	// Setting up the users profile api
	app.route('/agent/me').get(agents.me);
	app.route('/agent').put(agents.update);
	app.route('/agent/accounts').delete(agents.removeOAuthProvider);
	app.route('/agent/:agentId/accomodation').get(agents.getByUserId);

	// Setting up the users password api
	app.route('/agent/password').post(agents.changePassword);
	app.route('/auth/forgot').post(agents.forgot);
	app.route('/auth/reset/:token').get(agents.validateResetToken);
	app.route('/auth/reset/:token').post(agents.reset);

	// Setting up the users authentication api
	app.route('/agent/signup').post(agents.signup);
	app.route('/agent/signin').post(agents.signin);
	app.route('/auth/signout').get(agents.signout);

	// Setting the facebook oauth routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}));
	app.route('/auth/facebook/callback').get(agents.oauthCallback('facebook'));

	// Setting the twitter oauth routes
	app.route('/auth/twitter').get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback').get(agents.oauthCallback('twitter'));

	// Setting the google oauth routes
	app.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	app.route('/auth/google/callback').get(agents.oauthCallback('google'));

	// Setting the linkedin oauth routes
	app.route('/auth/linkedin').get(passport.authenticate('linkedin'));
	app.route('/auth/linkedin/callback').get(agents.oauthCallback('linkedin'));
	
	// Setting the github oauth routes
	app.route('/auth/github').get(passport.authenticate('github'));
	app.route('/auth/github/callback').get(agents.oauthCallback('github'));

	// Finish by binding the user middleware
	
	app.param('agentId', agents.agentByID);
};
