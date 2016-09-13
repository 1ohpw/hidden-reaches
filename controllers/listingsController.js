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
    // find the contact id from req.body
    db.Contact.findOne({_id: req.body.contact}, function(err, contactId){
      if (err) { return console.log(err); }
      // add this contact to the listing
      listing.contact = contactId;
      listing.save(function(err, newListing){
        if (err) { return console.log("save error: " + err); }
        // send back the new listing
        console.log(newListing);
        res.json(newListing);
      });
    });
  });
}


function destroy(req, res) {
  db.Listing.findOneAndRemove({_id: req.params.id}, function(err, deletedListing) {
    res.json(deletedListing);
  });
}

function update(req, res) {
  db.Listing.findById({_id: req.params.id}, function(err, foundListing) {
    if(err) { console.log('albumsController.update error', err); }
    foundListing.imgUrl = req.body.imgUrl;
    foundListing.street = req.body.street;
    foundListing.city = req.body.city;
    foundListing.state = req.body.state;
    foundListing.zip = req.body.zip;
    foundListing.title = req.body.title;
    foundListing.rent = req.body.rent;
    // foundListing.contact = req.body.contact;
    // foundListing.details = req.body.details;
    // foundListing.neighborhood = req.body.neighborhood;
    foundListing.save(function(err, savedListing) {
      if(err) { console.log('saving altered listing failed'); }
      res.json(savedListing);
    });
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
}
