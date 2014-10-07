'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Customer = mongoose.model('Customer');

/**
 * Globals
 */
var customer, customer2;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		customer = new Customer({
			yourName: 'Full',
			displayName: 'Full Name',
			email: 'test@test.com',
			password: 'password',
			provider: 'local'
		});
		customer2 = new Customer({
			yourName: 'Full',
			displayName: 'Full Name',
			email: 'test@test.com',
			password: 'password',
			provider: 'local'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			Customer.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			customer.save(done);
		});

		it('should fail to save an existing user again', function(done) {
			customer.save();
			return customer2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without first name', function(done) {
			customer.firstName = '';
			return customer.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	after(function(done) {
		Customer.remove().exec();
		done();
	});
});