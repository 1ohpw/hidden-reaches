var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Contact = require(./contact);

var ListingSchema = new Schema({
  imgUrl: String,
  address: String,
  title: String,
  rent: Number,
  Contact: [Contact.schema],
  Details: String,
  Neighborhood: String
});
