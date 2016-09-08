console.log("Sanity Check: JS is working!");
// Global Variabales
var listingsList;
var map;

var allListings;
// = [
//   {
//   title: "Sick pad in Russian Hill"
//   },
//   {
//   title: "Great Pac Heights Place"
//   },
//   {
//   title: "Perfect Oakland Crib"
//   },
//   {
//   title: "SOMA Living"
//   }
// ];



$(document).ready(function(){

  initMap();

  // Setting handlebars target variables
  $listingsList = $('#listingTarget');

  // compile handlebars templates for listings
  var source = $('#listings-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/listings',
    success: onSuccess
  })

  renderListings();

});

function onSuccess(json) {
  allListings = json;
  console.log(allListings);
  renderListings(allListings);
}


// function to initiate Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

// helper function to render all listings to view
// note: we can empty and re-render the collection each time our post or update data changes
function renderListings (listListings) {
  // empty existing posts from view
  $listingsList.empty();

  // pass `allListings` into the template function
  var listingsHtml = template({ listings: listListings });

  // append html to the view
  $listingsList.append(listingsHtml);
}
