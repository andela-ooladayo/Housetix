'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Accomodation = mongoose.model('Accomodation'),
    User=mongoose.model('User'),
    _ = require('lodash');

var uuid = require('node-uuid'),
    multiparty = require('multiparty'),
    async=require('async');

var path = require('path'),
    fs = require('fs');


/**
 * Create an accomodation
 */

exports.create = function(req, res) {
    var accomodation = new Accomodation(req.body);
    accomodation.user = req.user.id;
    accomodation.save(function(err, house) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else {
            res.jsonp(house);
        }
    });
};
/**
 * Show the current Accomodation
 */
exports.read = function(req, res) {
    res.jsonp(req.accomodation);
};

/**
 * Update a Accomodation
 */
exports.update = function(req, res) {
    var accomodation = req.accomodation;

    accomodation = _.extend(accomodation, req.body);

    accomodation.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } 
        else {
            res.jsonp(accomodation);
        }
    });
};

/**
 * Delete an Accomodation
 */
exports.delete = function(req, res) {
    var accomodation = req.accomodation;

    accomodation.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else {
            res.jsonp(accomodation);
        }
    });
};

/**
 * List of Accomodation
 */
exports.list = function(req, res) {
    
    Accomodation.find().sort('-created').populate('user', 'displayName').exec(function(err, accomodations) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else {
            res.jsonp(accomodations);
        }
    });
};

exports.search = function(req, res) {
    var value;
    if (typeof req.param('location')!== 'undefined') {
        value = req.param('location');
        Accomodation.find({location: value}, function(err, data) {
            if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
            }
            else {
                res.jsonp(data);
            }
        });
    }
    else {
        res('Not found');
    }
};

exports.deletePhoto = function(req, res){
    console.log(req);
    var photos = req.photos;

    photos.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else {
            res.jsonp(photos);
        }
    });


};




/**
 * Accomodation middleware
 */
exports.accomodationByID = function(req, res, next, id) {
    Accomodation.findById(id).populate('user', 'displayName').exec(function(err, accomodation) {
        if (err) return next(err);
        if (!accomodation) return next(new Error('Failed to load accomodation ' + id));
        req.accomodation = accomodation;
        next();
    });
};


/**
 * Accomodation authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.accomodation.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};