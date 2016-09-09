console.log("Sanity Check: JS is working!");
// Global Variabales
var listingsList;
var map;

var allListings;


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

  // click to initiate API call to add a new listing
  $('#addNewListing').on('click', handleNewListingSubmit);


});


// when the song modal submit button is clicked:
function handleNewListingSubmit(e) {
  e.preventDefault();
  var $modal = $('#listingModal');
  var $imgUrlField = $modal.find('#listingImgUrl');
  var $addressField = $modal.find('#listingAddress');
  var $titleField = $modal.find('#listingTitle');
  var $rentField = $modal.find('#listingRent');
  // var $contactField = $modal.find('#listingContact');
  var $detailsField = $modal.find('#listingDetails');
  var $neighborhoodField = $modal.find('#listingNeighborhood');

  // get data from modal fields
  var dataToPost = {
    imgUrl: $imgUrlField.val(),
    address: $addressField.val(),
    title: $titleField.val(),
    rent: $rentField.val(),
    // Contact: $contactField.val(),
    details: $detailsField.val(),
    neighborhood: $neighborhoodField.val()
  };
  console.log(dataToPost);

  // POST to SERVER
  $.ajax({
    method: 'POST',
    url: '/api/listings',
    data: dataToPost,
    success: newListingSuccess,
    error: newListingError
  });

  // clear form
  $imgUrlField.val('');
  $addressField.val('');
  $titleField.val('');
  $rentField.val('');
  // $contactField.val('');
  $detailsField.val('');
  $neighborhoodField.val('');

  // close modal
  $modal.modal('hide');

};


function newListingSuccess(json) {
  // update the listing listview
  // update the mapview
  console.log(json);
}


function newListingError(e) {
  console.log('Failed to add new listing');
}


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
