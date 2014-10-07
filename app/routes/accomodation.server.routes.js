'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	accomodations = require('../../app/controllers/accomodation');

module.exports = function(app) {
	// Article Routes
	app.route('/accomodation')
		.get(accomodations.list)
		.post(users.requiresLogin, accomodations.create);

	app.route('/accomodation/:accomodationId')
		.get(accomodations.read)
		.put(users.requiresLogin, accomodations.hasAuthorization, accomodations.update)
		.delete(users.requiresLogin, accomodations.hasAuthorization, accomodations.delete);
	
	app.route('/search')
		.get(accomodations.search);
	// Finish by binding the article middleware
	app.param('accomodationId', accomodations.accomodationByID);
	
};