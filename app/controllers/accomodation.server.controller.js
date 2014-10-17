'use strict';

/****

Module dependencies.

******/

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


/****

List a Space (Create accomodation)

 ***/

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


/******

Show the current Accomodation

*******/

exports.read = function(req, res) {
    res.jsonp(req.accomodation);
};



/*****

Update an Accomodation

******/

exports.update = function(req, res) {
    //init variable
    var accomodation = req.accomodation;

    //Replace the the accomodation with the changes made
    accomodation = _.extend(accomodation, req.body);

    //Save Changes
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


/****

Delete an Accomodation

*****/

exports.delete = function(req, res) {
    //initial variable
    var accomodation = req.accomodation;

    // Delete the accomodation from DB
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


/*****

List of Accomodation

******/

exports.list = function(req, res) {
    //List all the accomodation, sort by date and identify by user.
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


/*****

Search accomodation(s) by Location

******/

exports.search = function(req, res) {
    //initial variable
    var value;
    //Check wheather location parameter is empty! 
    if (typeof req.param('location')!== 'undefined') {
        value = req.param('location');

        //Find available accomodation based on Location
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


/*****

Delete an Image

******/
exports.deletePhoto = function (req, res) {
    //Find the the image parent(accomodation) by its Id
    Accomodation.findById(req.body.accomodationId).populate('user', 'displayName').exec(
        function(err, accomodation){
            if(err){
                return;
            }

            //Remove one image form the set of images
            accomodation.image.splice(req.body.index, 1);

            //Save accomodation after image removal
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
        }
    );
};



/*****

Accomodation middleware

****/

exports.accomodationByID = function(req, res, next, id) {
    //find accomodation by its Id
    Accomodation.findById(id).populate('user', 'displayName').exec(function(err, accomodation) {
        if (err) return next(err);
        if (!accomodation) return next(new Error('Failed to load accomodation ' + id));
        req.accomodation = accomodation;
        next();
    });
};


/*****

Accomodation authorization middleware

******/

exports.hasAuthorization = function(req, res, next) {
    //Check whether the user making request Id matches 
    if (req.accomodation.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};