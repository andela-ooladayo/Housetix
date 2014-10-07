// 'use strict';
// var mongoose = require('mongoose'),
// 	Schema = mongoose.Schema,
// 	crypto = require('crypto');

// var validateLocalStrategyProperty = function(property) {
// 	return ((this.provider !== 'loca' && !this.updated) || property.length);
// };

// var validateLocalStrategyPassword = function(password) {
// 	return (this.provider !== 'loca' || (password && password.length > 7));
// };

// var CustomerSchema = new Schema({
	
// 	yourName: {
// 		type: String,
// 		default: '',
// 		trim: true,
// 		required: 'Your Name cannot be blank'
// 	},
// 	yourEmail: {
// 		type: String,
// 		default: '',
// 		trim: true,
// 		required: 'Your Email cannot be blank',
// 		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
// 		match: [/.+\@.+\..+/, 'Please fill a valid email address']
// 	},
// 	password: {
// 		type: String,
// 		default: '',
// 		validate: [validateLocalStrategyPassword, 'Password should be longer']
// 	},
// 	salt: {
// 		type: String
// 	},
// 	provider: {
// 		type: String,
// 		required: 'Provider is required'
// 	},
// 	providerData: {},
// 	additionalProvidersData: {},
// 	username: {
// 		type: String,
// 		unique: 'testing error message',
// 		required: 'Please fill in a username',
// 		trim: true
// 	},
// 	roles: {
// 		type: [{
// 			type: String,
// 			enum: ['customer', 'admin']
// 		}],
// 		default: ['customer']
// 	},
// });
// CustomerSchema.pre('save', function(next) {
// 	if (this.password && this.password.length > 6) {
// 		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
// 		this.password = this.hashPassword(this.password);
// 	}

// 	next();
// });

// /**
//  * Create instance method for hashing a password
//  */
// CustomerSchema.methods.hashPassword = function(password) {
// 	if (this.salt && password) {
// 		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
// 	} else {
// 		return password;
// 	}
// };

// /**
//  * Create instance method for authenticating user
//  */
// CustomerSchema.methods.authenticate = function(password) {
// 	return this.password === this.hashPassword(password);
// };

// /**
//  * Find possible not used username
//  */
// CustomerSchema.statics.findUniqueUsername = function(username, suffix, callback) {
// 	var _this = this;
// 	var possibleUsername = username + (suffix || '');

// 	_this.findOne({
// 		username: possibleUsername
// 	}, function(err, user) {
// 		if (!err) {
// 			if (!user) {
// 				callback(possibleUsername);
// 			} else {
// 				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
// 			}
// 		} else {
// 			callback(null);
// 		}
// 	});
// };
