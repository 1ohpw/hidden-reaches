var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  facebookUrl: String
})

var Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
