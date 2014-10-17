'use strict';

/******

Module dependencies.

*******/

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	searchPlugin = require('mongoose-search-plugin');


/*******

Accomodation Schema

********/

var AccomodationSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	tag: {
		type: String,
		trim: true,
		required: 'tag field cannot be blank'
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
	image: [{
	    path: {
		   type: String,
		}
	}],
	user: {
		type: Schema.ObjectId,
		ref: 'Agent'
	}
});


mongoose.model('Accomodation', AccomodationSchema);