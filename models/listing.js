var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Contact = require(./contact);

var ListingSchema = new Schema({
  imgUrl: String,
  address: String,
  title: String,
  rent: Number,
  //Contact: [Contact.schema],
  details: String,
  neighborhood: String
});

var Listing = mongoose.model('Listing', ListingSchema);
module.exports = Listing;

