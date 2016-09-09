var db = require('../models');

function index(req,res) {
  db.Listing.find(function(err, listings) {
    if(err) {
      return console.log('Error getting listings');
    }
    res.json(listings);
   });
}

function show(req, res) {
  db.Listing.findOne({_id: req.params.id}, function(err, foundListing) {
    if(err) {
      return console.log('Error getting listing');
    }
    res.json(foundListing);
  });
}

function create(req, res) {
  console.log(req.body);
  db.Listing.create(req.body, function(err, listing) {
    if (err) { console.log('error', err); }
    console.log(listing);
    res.json(listing);
  });
}

function destroy(req, res) {
  db.Listing.findOneAndRemove({_id: req.params.id}, function(err, deletedListing) {
    res.json(deletedListing);
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy
}
