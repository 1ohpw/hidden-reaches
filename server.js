var express = require('express');

var app = express();

var db = require('./models');


app.get('/', function homepage(req, res) {
  res.sendFile('views/index.html', {root: __dirname});
});

app.use(express.static('public'));


//app.post

app.get('/api/listings', function (req,res) {
  db.Listing.find(function(err, listings) {
    if(err) {
      return console.log('Error getting listings');
    }
    res.json(listings);
   });
});

app.get('/api/listings/:id', function (req,res) {
  db.Listing.findOne({_id: req.params.id}, function(err, foundListing) {
    if(err) {
      return console.log('Error getting listing');
    }
    res.json(foundListing);
  });
});

//app.put

app.delete('/api/listings/:id', function (req,res) {
  db.Listing.findOneAndRemove({_id: req.params.id}, function(err, deletedListing) {
    res.json(deletedListing);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Express server running on localhost 3000');
});


