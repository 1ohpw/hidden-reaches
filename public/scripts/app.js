console.log("Sanity Check: JS is working!");

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
// var $contactField;
// var $detailsField;
// var $neighborhoodField;
var dataToUpdate = {};
var listingId;


$(document).ready(function(){

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
  // $contactField = $modal.find('#updateListingContact');
  // $detailsField = $modal.find('#updateListingDetails');
  // $neighborhoodField = $modal.find('#updateListingNeighborhood');

  $imgUrlField.val(listingToEdit.imgUrl);
  $streetField.val(listingToEdit.street);
  $cityField.val(listingToEdit.city);
  $stateField.val(listingToEdit.state);
  $zipField.val(listingToEdit.zip);
  $titleField.val(listingToEdit.title);
  $rentField.val(listingToEdit.rent);
  // $contactField.val(listingToEdit.contact);
  // $detailsField.val(listingToEdit.details);
  // $neighborhoodField.val(listingToEdit.neighborhood);

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
    // contact: $contactField.val(),
    // details: $detailsField.val(),
    // neighborhood: $neighborhoodField.val()
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

  // var listingMarkerToUpdate = markers.find(findListing);
  // markers.splice(listingMarkerToUpdate, 1);
  // setAllMap();
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
  // $contactField = $modal.find('#listingContact');
  // $detailsField = $modal.find('#listingDetails');
  // $neighborhoodField = $modal.find('#listingNeighborhood');

  // get data from modal fields
  var dataToPost = {
    imgUrl: $imgUrlField.val(),
    street: $streetField.val(),
    city: $cityField.val(),
    state: $stateField.val(),
    zip: $zipField.val(),
    title: $titleField.val(),
    rent: $rentField.val(),
    // contact: $contactField.val(),
    // details: $detailsField.val(),
    // neighborhood: $neighborhoodField.val()
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
  // $contactField.val('');
  // $detailsField.val('');
  // $neighborhoodField.val('');

  // close modal
  $modal.modal('hide');

};


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


// handler to open the modal for an existing listing
function openListingModal(id) {
  $.ajax({
    method: 'GET',
    url: 'api/listings/' + id,
    success: function(json) {
      deleteListingId = id;
      updateListingId = id;
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
