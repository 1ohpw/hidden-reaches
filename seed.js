var db = require('./models');


var listingArray = [{
  imgUrl: "",
  street: "2317 Rosedale Avenue",
  city: "Oakland",
  state: "CA",
  zip: 94601,
  title: "Unfurnised BR for rent",
  rent: 900,
},{
  imgUrl: "",
  street: "5615 Edgerly Street",
  city: "Oakland",
  state: "CA",
  zip: 94621,
  title: "Sublet Fall/Winter",
  rent: 1200,
},{
  imgUrl: "",
  street: "3970 The Woods Drive",
  city: "San Jose",
  state: "CA",
  zip: 95136,
  title: "Bunk Bed in a Triple",
  rent: 400,
},{
  imgUrl: "",
  street: "422 Colony Crest Dr",
  city: "San Jose",
  state: "CA",
  zip: 95123,
  title: "Bedroom w/ Dope View",
  rent: 625,
},{
  imgUrl: "",
  street: "322 East San Salavador Street",
  city: "San Jose",
  state: "CA",
  zip: 95112,
  title: "The House",
  rent: 906,
},{
  imgUrl: "",
  street: "1325 Glen Dell Drive",
  city: "San Jose",
  state: "CA",
  zip: 95125,
  title: "Furnished Garage Room",
  rent: 500,
},{
  imgUrl: "",
  street: "963 Celia Drive",
  city: "Palo Alto",
  state: "CA",
  zip: 94303 ,
  title: "Spacious Bedroom",
  rent: 1200,
},{
  imgUrl: "",
  street: "2633 Marshall Drive",
  city: "Palo Alto",
  state: "CA",
  zip: 94303,
  title: "Small but Beautiful BR",
  rent: 1120,
},{
  imgUrl: "",
  street: "615 Woodside Way",
  city: "San Mateo",
  state: "CA",
  zip: 94401,
  title: "Bed in Shared-Living Condo",
  rent: 1200,
},{
  imgUrl: "",
  street: "948 Patricia Avenue",
  city: "San Mateo",
  state: "CA",
  zip: 94401,
  title: "1BR/Private Bath",
  rent: 1000,
},{
  imgUrl: "",
  street: "2749 Acton Street",
  city: "Berkeley",
  state: "CA",
  zip: 94702,
  title: "Bunk in trendy loft",
  rent: 840,
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
