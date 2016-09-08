var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project-one');

module.exports.Listing = require('./listing.js');
module.exports.Contact = require('./contact.js');
