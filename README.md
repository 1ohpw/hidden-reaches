#Hidden Reaches <img src="./public/images/home.png" style="margin-left:40px;"> 
<hr>

<i>The Bay Area is a beautiful place, and the premiere location for those chasing their tech dreams. However the expensive costs here limit opportunity for many, who struggle to find an affordable place to live. Popular housing sites and apps are scattered, riddled with scams & unreasonable prices, as well as a confusing user experience. [Hidden Reaches](https://hidden-reaches-36395.herokuapp.com/) is here to simplify your housing needs. The simple interface makes it easy to find inexpensive rentals, or to post openings you have available.</i>

##Technologies
Hidden Reaches features a Google Maps map with house icons at each listing, as well as a listview of posts. Clicking on an icon or list item will open a modal with a Google Maps Streetview image of the post's address (for verification), details, and contact information. You can also click the button to "Create A Listing" that: must be in the Bay Area, a verified address from the Google Places Autocomplete search bar, and no more than $1200 monthly. 

####Languages
<ul>
	<li>HTML/CSS</li>
	<li>JavaScript</li>
</ul>

####Libraries/Frameworks/API
<ul>
	<li>Bootstrap/Bootstrap Validator</li>
	<li>jQuery</li>
	<li>Google API's: Maps, Streetview, Geocoding, Places</li>
</ul>

####Database/Server
<ul>
	<li>Node.js/Express</li>
	<li>MongoDB/Mongoose</li>
</ul>

##Code
####Bay Area Address verification

```var cityInBay = false;
      bayAreaCities.forEach(function(bayCity) {
        if($('#listingCity').val() == bayCity) {
          cityInBay = true;
        }
      });

      if(cityInBay == false) {
        e.preventDefault();
        alert("Please choose an Bay Area address");
      }
```

####Get Existing Contact
```function handleGetContact(e) {
  e.preventDefault();
  $modal = $('#listingModal');
  $contactNameField = $modal.find('#listingContactName');

  // get data for this contact
  contactDataToGet = $contactNameField.val();

  $.ajax({
    method: "GET",
    url: 'api/contacts/' + contactDataToGet,
    success: onGetContactSuccess
  })
}


// handler for successful edit listing api response
function onGetContactSuccess (json) {
  $modal = $('#listingModal');
  $contactNameField = $modal.find('#listingContactName');
  $contactEmailField = $modal.find('#listingContactEmail');
  $contactPhoneField = $modal.find('#listingContactPhone');
  $contactFBField = $modal.find('#listingContactFB');
  returnContact = json;
  if (json) {
      $contactNameField.val(returnContact.name);
      $contactEmailField.val(returnContact.email);
      $contactPhoneField.val(returnContact.phone);
      $contactFBField.val(returnContact.facebookUrl);
      foundExistingContact = 1;
    } else {
      $contactNameField.val('ADD NEW CONTACT');
    };
}
```

##Screenshots
<img src="./public/images/screenshots.png">

######Core Technical Requirements

- [x] Express API
- [x] RESTful Routes
- [x] AJAX
- [x] jQuery
- [x] Templating
- [x] MongoDB
- [x] Visual Design
- [x] Code Style
- [x] Git
- [x] Heroku
- [x] Documentation

####Flex Technical Requirements
- [x] External API
- [x] Data Validation
- [x] Bootstrap
- [x] Model Relationship
- [ ] Sessions

