var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Contact = require('./contact');

var ListingSchema = new Schema({
  imgUrl: String,
  street: String,
  city: String,
  state: String,
  zip: Number,
  title: String,
  rent: Number,
  Contact: [Contact.schema],
});

var Listing = mongoose.model('Listing', ListingSchema);
module.exports = Listing;

