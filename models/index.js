var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project-one');

module.exports.Listing = require('./listing.js');
