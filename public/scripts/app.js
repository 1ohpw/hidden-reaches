
// Global Variabales
var listingsList;
var map;
var listingModalTemplate;
var allListings;
var geocoder = new google.maps.Geocoder();
var allListings = [];
var newListing;

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


  var listingModalSource = $('#listing-modal-template').html();
  listingModalTemplate = Handlebars.compile(listingModalSource);

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
  newListing = json;
  geocodeAddress(newListing);
  allListings.unshift(newListing);
  renderListings(allListings);

  // update the mapview
  console.log(json);
}


function newListingError(e) {
  console.log('Failed to add new listing');
}


function onSuccess(json) {
  allListings = json;
  renderListings(allListings);

  allListings.forEach(function(listing) {
    var formattedAddress = listing.street + ' ' + listing.city + ',' +
                            listing.state + ' ' + listing.zip;
    var id = listing._id;
    geocodeAddress(formattedAddress, id);
  });
}

function geocodeAddress(geoAddress, id) {
  var geoLatLng;
  geocoder.geocode({
      address: geoAddress
    }, function(results, status) {
        if(status == 'OK') {
            var geoLat = results[0].geometry.location.lat();
            var geoLng = results[0].geometry.location.lng();
            geoLatLng = {
              lat: geoLat,
              lng: geoLng
            }

            var marker = new google.maps.Marker({
            position: geoLatLng,
            map: map,
            animation: google.maps.Animation.DROP
            });

            marker.addListener('click', function() {
              //console.log('clicked: ' + );
              //console.log(id);
              openListingModal(id);
            });
        }else{
            console.log("Geocode unsuccessful");
        }
      });
}



function openListingModal(id) {
  $.ajax({
    method: 'GET',
    url: 'api/listings/' + id,
    success: function(json) {
      var listingModalHtml = listingModalTemplate({
        imgUrl: "http://placehold.it/700x300",
        title: json.title,
        street: json.street,
        city: json.city,
        state: json.state,
        rent: json.rent
      });

      $('#listing-modal-container').empty();
      $('#listing-modal-container').append(listingModalHtml);

      $('#myModal').modal();
    }
  })

}

// function to initiate Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 10,
    mapTypeId: 'hybrid'
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
