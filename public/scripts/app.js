// Global Variabales
var listingsList;
var map;
var listingModalTemplate;
var allListings;
var geocoder = new google.maps.Geocoder();
var allListings = [];
var newListing;
var deleteListingId;
var updateListingId;
var markers = [];
var $modal;
var $imgUrlField;
var $streetField;
var $cityField;
var $stateField;
var $zipField;
var $titleField;
var $rentField;
var dataToUpdate = {};
var listingId;
var autocomplete;


$(document).ready(function(){
  initAutocomplete();

  $('#createNewListing').on("click", function() {
    $('#listingModal').modal();
  });

  // sets map on the page
  initMap();

  // setting handlebars target variables
  $listingsList = $('#listingTarget');

  // compile handlebars templates for listings
  var source = $('#listings-template').html();
  template = Handlebars.compile(source);

  // api call to get all listings from the database for the page
  $.ajax({
    method: 'GET',
    url: '/api/listings',
    success: onSuccess
  })

  // compile handlebars templates for the listing modal
  var listingModalSource = $('#listing-modal-template').html();
  listingModalTemplate = Handlebars.compile(listingModalSource);

  // renders listings to the page
  renderListings();

  // click to initiate API call to add a new listing
  $('#addNewListing').on('click', handleNewListingSubmit);

});


// API call to get listing data to be updated
function handleEditListing(e) {
  e.preventDefault();
  // close modal
  $('#myModal').modal('hide');
  $('#updateListingModal').modal();
  $.ajax({
    method: "GET",
    url: 'api/listings/' + updateListingId,
    success: onEditCallSuccess
  })
}


// handler for successful edit listing api response
function onEditCallSuccess (json) {
  var listingToEdit = json;
  $modal = $('#updateListingModal');
  $imgUrlField = $modal.find('#updateListingImgUrl');
  $streetField = $modal.find('#updateListingStreet');
  $cityField = $modal.find('#updateListingCity');
  $stateField = $modal.find('#updateListingState');
  $zipField = $modal.find('#updateListingZip');
  $titleField = $modal.find('#updateListingTitle');
  $rentField = $modal.find('#updateListingRent');

  $imgUrlField.val(listingToEdit.imgUrl);
  $streetField.val(listingToEdit.street);
  $cityField.val(listingToEdit.city);
  $stateField.val(listingToEdit.state);
  $zipField.val(listingToEdit.zip);
  $titleField.val(listingToEdit.title);
  $rentField.val(listingToEdit.rent);

  $('#updateListing').on('click', handleUpdateListing);

}


// API call to update the listing
function handleUpdateListing(e) {
  e.preventDefault();

  // get new data from modal fields
  dataToUpdate = {
    imgUrl: $imgUrlField.val(),
    street: $streetField.val(),
    city: $cityField.val(),
    state: $stateField.val(),
    zip: $zipField.val(),
    title: $titleField.val(),
    rent: $rentField.val(),
  };

  // close modal
  $('#updateListingModal').modal('hide');

  $.ajax({
    method: "PUT",
    url: 'api/listings/' + updateListingId,
    data: dataToUpdate,
    success: onUpdateCallSuccess
  })
}

// handler for successful update listing api response
function onUpdateCallSuccess (json) {
  var updatedListing = json;
  console.log(updatedListing);
  listingId = updatedListing._id;

  function findListing(listing) {
      return listing._id === listingId;
  }

  var listingToUpdate = allListings.find(findListing);
  allListings[listingToUpdate] = updatedListing;
  renderListings(allListings);
  renderMarkers();
}


// API call to delete a listing
function handleDeleteListing(e) {
  e.preventDefault();
  // close modal
  $('#myModal').modal('hide');
  console.log('listing deleted')
  console.log(deleteListingId);
  $.ajax({
    method: "DELETE",
    url: 'api/listings/' + deleteListingId,
    success: onDeleteSuccess
  })
}


// handler for successful delete listing api response
function onDeleteSuccess (json) {
  listingId = json._id;

  function findListing(listing) {
      return listing._id === listingId;
  }

  var listingToDelete = allListings.find(findListing);
  allListings.splice(listingToDelete, 1);
  renderListings(allListings);
  renderMarkers();

  var listingMarkerToDelete = markers.find(findListing);
  markers.splice(listingMarkerToDelete, 1);
  setAllMap();
}


// handler when submit new listing modal button is clicked:
function handleNewListingSubmit(e) {
  e.preventDefault();
  $modal = $('#listingModal');
  $imgUrlField = $modal.find('#listingImgUrl');
  $streetField = $modal.find('#listingStreet');
  $cityField = $modal.find('#listingCity');
  $stateField = $modal.find('#listingState');
  $zipField = $modal.find('#listingZip');
  $titleField = $modal.find('#listingTitle');
  $rentField = $modal.find('#listingRent');

  // get data from modal fields
  var dataToPost = {
    imgUrl: $imgUrlField.val(),
    street: $streetField.val(),
    city: $cityField.val(),
    state: $stateField.val(),
    zip: $zipField.val(),
    title: $titleField.val(),
    rent: $rentField.val(),
  };

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
  $streetField.val('');
  $cityField.val('');
  $stateField.val('');
  $zipField.val('');
  $titleField.val('');
  $rentField.val('');

  // close modal
  $modal.modal('hide');

};

function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.

        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});

        console.log(autocomplete);

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
      }


function fillInAddress() {

  var place = autocomplete.getPlace().address_components;
  console.log(place);
  $('#listingStreet').val(place[0].short_name + ' ' +  place[1].long_name);
  $('#listingCity').val(place[3].long_name);
  $('#listingState').val(place[5].short_name);
  $('#listingZip').val(place[7].long_name);
}

function geolocate() {
           var geolocation = {
              lat: 37.7749,
              lng: -122.4194
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: 6437.38
            });
            autocomplete.setBounds(circle.getBounds());


        console.log('running geolocate');
  }

// handler for succesful new listing api response
function newListingSuccess(json) {
  newListing = json;
  var formattedAddress = newListing.street + ' ' + newListing.city + ',' +
                            newListing.state + ' ' + newListing.zip;
  var id = newListing._id;
  geocodeAddress(formattedAddress, id);
  allListings.unshift(newListing);
  renderListings(allListings);
}

function newListingError(e) {
  console.log('Failed to add new listing');
}


// handler for succesful page load, renders listings and markers to the page
function onSuccess(json) {
  allListings = json.reverse();
  renderListings(allListings);
  renderMarkers();
}


// renders markers to the map
function renderMarkers() {
  allListings.forEach(function(listing) {
    var formattedAddress = listing.street + ' ' + listing.city + ',' +
                            listing.state + ' ' + listing.zip;
    var id = listing._id;
    geocodeAddress(formattedAddress, id);
  });
  setAllMap();
}


// geocodes addresses from the database into lat/long for map marker placement
function geocodeAddress(geoAddress, id) {
  var geoLat;
  var geoLng;
  var geoLatLng;
  geocoder.geocode({
      address: geoAddress
    }, function(results, status) {
        if(status == 'OK') {
            geoLat = results[0].geometry.location.lat();
            geoLng = results[0].geometry.location.lng();
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
              openListingModal(id, geoAddress);
            });

            markers.push(marker);

        }else{
            console.log("Geocode unsuccessful");
        }
      });
}


// sets all the markers to the map from the markers array
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function openListingModal(id, addressString) {
  $.ajax({
    method: 'GET',
    url: 'api/listings/' + id,
    success: function(json) {
      deleteListingId = id;
      updateListingId = id;
      var listingModalHtml = listingModalTemplate({
        imgUrl: "https://maps.googleapis.com/maps/api/streetview?size=700x300&location=" + addressString + "&fov=75&pitch=5&key=AIzaSyARQHjCO5uJhqZTFtRIW0_pl77gch1ve8s",
        title: json.title,
        street: json.street,
        city: json.city,
        state: json.state,
        rent: json.rent
      });

      $('#listing-modal-container').empty();
      $('#listing-modal-container').append(listingModalHtml);

      $('#myModal').modal();

      $('#deleteListing').on('click', handleDeleteListing);
      $('#editListing').on('click', handleEditListing);
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


function renderListings (listListings) {
  // empty existing posts from view
  $listingsList.empty();

  // pass `allListings` into the template function
  var listingsHtml = template({ listings: listListings });

  // append html to the view
  $listingsList.append(listingsHtml);
}
