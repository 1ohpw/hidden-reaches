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
  title: "Spacious loft",
  rent: 1000,
},{
  imgUrl: "",
  street: "6403 Foothill Blvd",
  city: "Oakland",
  state: "CA",
  zip: 94605,
  title: "Cozy studio",
  rent: 1000,
},{
  imgUrl: "",
  street: "301 King Street",
  city: "San Francisco",
  state: "CA",
  zip: 94158,
  title: "Apartment 1 BR",
  rent: 750,
},{
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
  title: "Spacious loft",
  rent: 1000,
},{
  imgUrl: "",
  street: "6403 Foothill Blvd",
  city: "Oakland",
  state: "CA",
  zip: 94605,
  title: "Cozy studio",
  rent: 1000,
},{
  imgUrl: "",
  street: "301 King Street",
  city: "San Francisco",
  state: "CA",
  zip: 94158,
  title: "Apartment 1 BR",
  rent: 750,
},{
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
  title: "Spacious loft",
  rent: 1000,
},{
  imgUrl: "",
  street: "6403 Foothill Blvd",
  city: "Oakland",
  state: "CA",
  zip: 94605,
  title: "Cozy studio",
  rent: 1000,
},{
  imgUrl: "",
  street: "301 King Street",
  city: "San Francisco",
  state: "CA",
  zip: 94158,
  title: "Apartment 1 BR",
  rent: 750,
},{
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
  title: "Spacious loft",
  rent: 1000,
},{
  imgUrl: "",
  street: "6403 Foothill Blvd",
  city: "Oakland",
  state: "CA",
  zip: 94605,
  title: "Cozy studio",
  rent: 1000,
},{
  imgUrl: "",
  street: "301 King Street",
  city: "San Francisco",
  state: "CA",
  zip: 94158,
  title: "Apartment 1 BR",
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
