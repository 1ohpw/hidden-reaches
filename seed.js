var db = require('./models');

var scottName = "Scott Whitman";
var wolfName = "Wolf Man";
var scottFoundId = "";
var wolfFoundId = "";

var contactArray = [{
  name: "Scott Whitman",
  email: "scott.w.whitman@gmail.com",
  phone: "415-202-3558",
  facebookUrl: "https://www.facebook.com/Scott.w.Whitman"
},{
  name: "Wolf Man",
  email: "dlr249@cornell.edu",
  phone: "216-288-2134",
  facebookUrl: "https://www.facebook.com/denzale.reese"
}];


db.Contact.remove({}, function(err, contacts) {
  if(err) {
    console.log(err);
  }else{
    console.log("Removed all contacts");

    db.Contact.create(contactArray, function(err, contacts) {
      if(err) {
        return console.log('err', err);
      }
      db.Contact.findOne({name: wolfName}, function(err, wolfFound){
        if (err) { return console.log(err); }
        // add this contact to the listing
        wolfFoundId = wolfFound._id;
        for (var i = 0; i < listingArray.length; i++) {
            listingArray[i].contact = wolfFoundId;
        };
        console.log(listingArray);
        runListings();
      });
    });
  }
});


var listingArray = [{
  imgUrl: "",
  street: "2317 Rosedale Avenue",
  city: "Oakland",
  state: "CA",
  zip: 94601,
  title: "Unfurnised BR for rent",
  rent: 900,
  contact: ""
},{
  imgUrl: "",
  street: "5615 Edgerly Street",
  city: "Oakland",
  state: "CA",
  zip: 94621,
  title: "Sublet Fall/Winter",
  rent: 1200,
  contact: ""
},{
  imgUrl: "",
  street: "3970 The Woods Drive",
  city: "San Jose",
  state: "CA",
  zip: 95136,
  title: "Bunk Bed in a Triple",
  rent: 400,
  contact: ""
},{
  imgUrl: "",
  street: "422 Colony Crest Dr",
  city: "San Jose",
  state: "CA",
  zip: 95123,
  title: "Bedroom w/ Dope View",
  rent: 625,
  contact: ""
},{
  imgUrl: "",
  street: "322 East San Salavador Street",
  city: "San Jose",
  state: "CA",
  zip: 95112,
  title: "The House",
  rent: 906,
  contact: ""
},{
  imgUrl: "",
  street: "1325 Glen Dell Drive",
  city: "San Jose",
  state: "CA",
  zip: 95125,
  title: "Furnished Garage Room",
  rent: 500,
  contact: ""
},{
  imgUrl: "",
  street: "963 Celia Drive",
  city: "Palo Alto",
  state: "CA",
  zip: 94303 ,
  title: "Spacious Bedroom",
  rent: 1200,
  contact: ""
},{
  imgUrl: "",
  street: "2633 Marshall Drive",
  city: "Palo Alto",
  state: "CA",
  zip: 94303,
  title: "Small but Beautiful BR",
  rent: 1120,
  contact: ""
},{
  imgUrl: "",
  street: "615 Woodside Way",
  city: "San Mateo",
  state: "CA",
  zip: 94401,
  title: "Bed in Shared-Living Condo",
  rent: 1200,
  contact: ""
},{
  imgUrl: "",
  street: "948 Patricia Avenue",
  city: "San Mateo",
  state: "CA",
  zip: 94401,
  title: "1BR/Private Bath",
  rent: 1000,
  contact: ""
},{
  imgUrl: "",
  street: "2749 Acton Street",
  city: "Berkeley",
  state: "CA",
  zip: 94702,
  title: "Bunk in trendy loft",
  rent: 840,
  contact: ""
}];


function runListings() {
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
}
