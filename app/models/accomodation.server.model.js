'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	searchPlugin = require('mongoose-search-plugin');

/**
 * Accomodation Schema
 */
var AccomodationSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	roomNo: {
		type: String,
		default: '',
		trim: true,
		required: 'RoomNo field cannot be blank'
	},
	price: {
		type: String,
		default: '',
		trim: true,
		required: 'Price field cannot be blank'
	},
	address: {
		type: String,
		default: '',
		trim: true,
		required: 'address field cannot be blank'
	},
	location: {
		type: String,
		default: '',
		trim: true,
		required: 'location field cannot be blank'
	},
	imageURL: {
		frontview:{
			type: String,
			required: 'frontview field cannot be blank'
		},
		toilet:{
			type: String,
			required: 'toilet field cannot be blank'
		},
		kitchen:{
			type: String,
			required: 'kitchen field cannot be blank'
		},
		interior:{
			type: String,
			required: 'interior cannot be blank'
		}
	},
	user: {
		type: Schema.ObjectId,
		ref: 'Agent'
	}
});


mongoose.model('Accomodation', AccomodationSchema);