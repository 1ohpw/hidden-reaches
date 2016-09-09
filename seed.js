var db = require('./models');

var listingArray = [{
  imgUrl: "",
  street: "255 King St",
  city: "San Francisco",
  state: "CA",
  zip: 94017,
  title: "Bachelor Pad",
  rent: 800,
},{
  imgUrl: "",
  street: "225 Bush St",
  city: "San Francisco",
  state: "CA",
  zip: 94104,
  title: "GA",
  rent: 1000,
},{
  imgUrl: "",
  street: "6403 Foothill Blvd",
  city: "Oakland",
  state: "CA",
  zip: 94605,
  title: "1 BR open",
  rent: 1000,
},{
  imgUrl: "",
  street: "1625 Orchard Ave",
  city: "San Leandro",
  state: "CA",
  zip: 94577,
  title: "Living room open",
  rent: 750,
}];


db.Listing.remove({}, function(err, listings) {
  if(err) {
    console.log(err);
  }else{
    console.log("Removed all listings");

    db.Listing.create(listingArray, function(err, listings) {
      if(err) {
        return console.log('err', err);
      }
      console.log('created ' + listingArray.length + ' listings');
      process.exit();
    });
  }
});
