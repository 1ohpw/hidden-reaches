
// Global Variabales
var listingsList;
var map;
var listingModalTemplate;

var allListings;
var geocoder = new google.maps.Geocoder();

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

  //$('#listingModal').modal();

  var listingModalSource = $('#listing-modal-template').html();
  listingModalTemplate = Handlebars.compile(listingModalSource);

});



function onSuccess(json) {
  allListings = json;
  renderListings(allListings);

  allListings.forEach(function(listing) {
    var formattedAddress = listing.street + ' ' + listing.city + ',' +
                            listing.state + ' ' + listing.zip;
    geocodeAddress(formattedAddress);
  });
}

function geocodeAddress(geoAddress) {
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
            map: map
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
