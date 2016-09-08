var db = require('./models');

var listingArray = [{
  imgUrl: "",
  address: "255 King St San Francisco, CA",
  title: "Bachelor Pad",
  rent: 800,
  //Contact: [Contact.schema],
  details: "Really cool studio",
  neighborhood: "SF"
},{
  imgUrl: "",
  address: "225 Bush St San Francisco, CA",
  title: "GA",
  rent: 1000,
  //Contact: [Contact.schema],
  details: "School/Start-up",
  neighborhood: "SF"
},{
  imgUrl: "",
  address: "301 King St Oakland, CA",
  title: "1 BR open",
  rent: 1000,
  //Contact: [Contact.schema],
  details: "Shared space",
  neighborhood: "Oakland"
},{
  imgUrl: "",
  address: "1625 Orchard St San Leandro, CA",
  title: "Living room open",
  rent: 750,
  //Contact: [Contact.schema],
  details: "Just the living room",
  neighborhood: "San Leandro"
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
