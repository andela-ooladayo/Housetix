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
    fs = require('fs'),
    cloudinary = require('cloudinary').v2;


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

exports.deletePhoto = function(req, res) {
    console.log(req.accomodation);
    var accomodation = req.accomodation;
    // accomodation.image.slice=accomodation.image.slice(index,1)
    
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


// var fs = require('fs');



// var uploads = {};

// // set your env variable CLOUDINARY_URL or set the following configuration
// /*cloudinary.config({
//   cloud_name: '',
//   api_key: '',
//   api_secret: ''
// });*/

// console.log( "** ** ** ** ** ** ** ** ** Uploads ** ** ** ** ** ** ** ** ** **");

// // File upload
// cloudinary.uploader.upload('pizza.jpg',{tags:'basic_sample'},function(err,image){
//   console.log();
//   console.log("** File Upload");
//   if (err){ console.warn(err);}
//   console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
//   console.log("* "+image.public_id);
//   console.log("* "+image.url);
//   waitForAllUploads("pizza",err,image);
// });


// // Stream upload
// var stream = cloudinary.uploader.upload_stream({tags: 'basic_sample'},function(err,image) {
//   console.log();
//   console.log("** Stream Upload");
//   if (err){ console.warn(err);}
//   console.log("* Same image, uploaded via stream");
//   console.log("* "+image.public_id);
//   console.log("* "+image.url);
//   waitForAllUploads("pizza3",err,image);
// });
// var file_reader = fs.createReadStream('pizza.jpg', {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);


// // File upload (example for promise api)
// cloudinary.uploader.upload('pizza.jpg',{tags:'basic_sample'})
// .then(function(image){
//   console.log();
//   console.log("** File Upload (Promise)");
//   console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
//   console.log("* "+image.public_id);
//   console.log("* "+image.url);
// })
// .catch(function(err){
//   console.log();
//   console.log("** File Upload (Promise)");
//   if (err){ console.warn(err);}
// });



// // Public Id
// cloudinary.uploader.upload('pizza.jpg',{tags: 'basic_sample',public_id:'my_favorite_pizza'},function(err,image){
//   console.log();
//   console.log("** Public Id");
//   if (err){ console.warn(err);}
//   console.log("* Same image, uploaded with a custom public_id");
//   console.log("* "+image.public_id);
//   console.log("* "+image.url);
//   waitForAllUploads("pizza2",err,image);
// });


// // Eager Transformations:
// // Applied as soon as the file is uploaded, instead of lazily applying them when accessed by your site's visitors.
// var eager_options = {
//   width: 200, height: 150, crop: 'scale', format: 'jpg'
// };
// cloudinary.uploader.upload("lake.jpg", {tags : "basic_sample", public_id : "blue_lake", eager: eager_options}, function(err,image){
//   // "eager" parameter accepts a hash (or just a single item). You can pass
//   // named transformations or transformation parameters as we do here.
//   console.log();
//   console.log("** Eager Transformations");
//   if (err){ console.warn(err);}
//   console.log("* "+image.public_id);
//   console.log("* "+image.eager[0].url);
//   waitForAllUploads("lake",err,image);
// });


// // Remote URL:
// // In the two following examples, the file is fetched from a remote URL and stored in Cloudinary.
// // This allows you to apply transformations and take advantage of Cloudinary's CDN layer.
// cloudinary.uploader.upload('http://res.cloudinary.com/demo/image/upload/couple.jpg', {tags : "basic_sample"}, function(err,image){
//   console.log();
//   console.log("** Remote Url");
//   if (err){ console.warn(err);}
//   console.log("* "+image.public_id);
//   console.log("* "+image.url);
//   waitForAllUploads("couple",err,image);
// });


// // Here, the transformation is applied to the uploaded image BEFORE storing it on the cloud.
// // The original uploaded image is discarded.
// cloudinary.uploader.upload('http://res.cloudinary.com/demo/image/upload/couple.jpg', 
//                            {"tags":"basic_sample","width":500,"height":500,"crop":"fit","effect":"saturation:-70"} ,
//                            function(err,image){
//                              console.log();
//                              console.log("** Remote Url");
//                              if (err){ console.warn(err);}
//                              console.log("* "+image.public_id);
//                              console.log("* "+image.url);
//                              waitForAllUploads("couple2",err,image);
//                            });


//  function waitForAllUploads(id,err,image){
//    uploads[id] = image;
//    var ids = Object.keys(uploads);
//    if (ids.length==6){
//      console.log();
//      console.log ('**  uploaded all files ('+ids.join(',')+') to cloudinary');
//      performTransfromations();
//    }
//  }

// function performTransfromations(){
//   console.log();
//   console.log();
//   console.log();
//   console.log( ">> >> >> >> >> >> >> >> >> >>  Transformations << << << << << << << << << <<");
//   console.log();
//   console.log( "> Fit into 200x150");
//   console.log( "> " + cloudinary.url(uploads.pizza2.public_id, {width: 200, height: 150, crop: "fit", format: "jpg"}));

//   console.log();
//   console.log( "> Eager transformation of scaling to 200x150");
//   console.log( "> " + cloudinary.url(uploads.lake.public_id, eager_options));

//   console.log();
//   console.log( "> Face detection based 200x150 thumbnail");
//   console.log( "> " + cloudinary.url(uploads.couple.public_id, {width: 200, height: 150, crop: "thumb", gravity: "faces", format: "jpg"}));

//   console.log();
//   console.log( "> Fill 200x150, round corners, apply the sepia effect");
//   console.log( "> " + cloudinary.url(uploads.couple2.public_id, {width: 200, height: 150, crop: "fill", gravity: "face", radius: 10, effect:"sepia", format: "jpg"}));

//   console.log();
//   console.log( "> That's it. You can now open the URLs above in a browser");
//   console.log( "> and check out the generated images.");
// }