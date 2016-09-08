var express = require('express');

var app = express();

var db = require('./models');
var controllers = require('./controllers');


app.get('/', function homepage(req, res) {
  res.sendFile('views/index.html', {root: __dirname});
});

app.use(express.static('public'));


app.get('/api/listings', controllers.listings.index);

app.get('/api/listings/:id', controllers.listings.show);

app.listen(process.env.PORT || 3000, function() {
  console.log('Express server running on localhost 3000');
});


