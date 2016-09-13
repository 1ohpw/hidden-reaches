// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app called 'app'
var app = express();
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// May be able to remove db from server
var db = require('./models');
var controllers = require('./controllers');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

 app.get('/', function homepage(req, res) {
   res.sendFile('views/index.html', {root: __dirname});
 });


/*
 * JSON API Endpoints
 */

app.get('/api/listings', controllers.listings.index);

app.get('/api/listings/:id', controllers.listings.show);

app.post('/api/listings', controllers.listings.create);

app.delete('/api/listings/:id', controllers.listings.destroy);

app.put('/api/listings/:id', controllers.listings.update);

app.post('/api/contacts', controllers.contacts.create);

app.get('/api/contacts/:name', controllers.contacts.show);


/**********
 * SERVER *
 **********/

// listen on Heroku or port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('Express server running on localhost 3000');
});
