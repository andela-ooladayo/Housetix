'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Accomodation = mongoose.model('Accomodation'),
    User=mongoose.model('users'),
    _ = require('lodash'),
    formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra'),
    qt   = require('quickthumb');

/**
 * Create a Accomodation
 */
var uploadImage = function(req, res, contentType, tmpPath, destPath) {
    // Server side file type checker.
    if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
        fs.unlink(tmpPath);
        return res.send(400, { 
            message: 'Unsupported file type. Only jpeg or png format allowed' 
        });
    } else {
        fs.readFile(tmpPath , function(err, data) {
            fs.writeFile(destPath, data, function(err) {
                if (err) {
                   return res.send(400, { message: 'Destination path doesn\'t exist.' });
                }
                else {
                  destPath = 
                }
            }); 
        });
    }
};









exports.create = function(req, res, contentType, tmpPath, destPath) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        
    if (files.file) {
        //if there is a file do upload
        var file = files.file[0],     contentType = file.headers['content-type'],
            tmpPath = file.path,      extIndex = tmpPath.lastIndexOf('.'),
            extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);

        // uuid is for generating unique filenames. 
        var fileName = uuid.v4() + extension;
        
        var destPath =  'public/modules/core/img/server/Temp/' + fileName;
             
        uploadImage(req, res, contentType, tmpPath, destPath, person, experience);
    } 

   }
    var accomodation = new Accomodation(req.body);
    accomodation.user = req.user;
    accomodation.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(accomodation);
        }
    });
};
/**
 * Create a Accomodation
 */
exports.upload = function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({
        fields: fields, files: files}));
    });

  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file */
    var new_location = 'uploadapp/uploads/';

    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
});


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
        } else {
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
        } else {
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
        } else {
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
            } else {
                res.jsonp(data);
            }
        });
    } else {
        res('Not found');
    }
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